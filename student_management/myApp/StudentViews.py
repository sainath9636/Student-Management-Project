from django.shortcuts import render, redirect
from django.urls import reverse
from .models import Leaves, Student, Teacher, Department, ExamName, Subject, MarksList, User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.db.models import Q
from django.db.models import Avg, Sum, Count, F, Func, FloatField
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import *
from rest_framework import status
import json
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated

#@login_required(login_url='/')
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def home(request, id):
    #id = json.loads(request.body)['id']
    exam_marks_list = MarksList.objects.filter(Q(student_id=id)).values("exam_name", "subject_name", "marks_scored")
    #print(JsonResponse({'data':list(exam_marks_list)}))
    mid1_subj_marks = {}
    mid2_subj_marks = {}
    sliptest_subj_marks = {}
    sem_subj_marks = {}
    for d in exam_marks_list:
        if d['exam_name'] == "Mid Exam -1":
            mid1_subj_marks[d['subject_name']] = d['marks_scored']
        elif d['exam_name'] == "Mid Exam -2":
            mid2_subj_marks[d['subject_name']] = d['marks_scored']
        elif d['exam_name'] == 'Slip Test':
            sliptest_subj_marks[d['subject_name']] = d['marks_scored']
        elif d['exam_name'] == 'SEM Exam':
            sem_subj_marks[d['subject_name']] = d['marks_scored']
    mid1 = mid1_subj_marks.values()
    mid2 = mid2_subj_marks.values()
    slip = sliptest_subj_marks.values()
    sems = sem_subj_marks.values()
    failed_subjects = 0
    passed_subjects = 0
    total_CGPA = []
    for sub in mid1_subj_marks:
        mid = (mid1_subj_marks[sub]+mid2_subj_marks[sub])/2
        sem = sem_subj_marks[sub]
        total = round(mid+sem,2)
        total_CGPA.append(total)
        if(total<35):
            failed_subjects+=1
        else:
            passed_subjects+=1
    total_CGPA = round((sum(total_CGPA)/len(total_CGPA))/10,2)
    mid1_total_percentage = round((sum(mid1)/(len(mid1)*25)*100),2)
    mid2_total_percentage = round((sum(mid2)/(len(mid2)*25)*100),2)
    slip_total_percentage = round((sum(slip)/(len(slip)*25)*100),2)
    sem_total_percentage = round((sum(sems)/(len(sems)*75)*100),2)
    semister_name = MarksList.objects.filter(student_id=request.session.get('id')).values('semister').distinct().aggregate(sem = Count('semister'))
    exam_list = ["Slip-Test", 'Mid-1', "Mid-2", "Sem Exam"]
    overall = [slip_total_percentage,mid1_total_percentage, mid2_total_percentage, sem_total_percentage]
    #data = {'failed':failed_subjects,'passed':passed_subjects,'semisters':semister_name['sem'],'cgpa':total_CGPA,'overall':overall,'label':exam_list}
    #return render(request, 'student/home.html',context)
    #context = json.dumps(context)
    data = {'failed':failed_subjects,'passed':passed_subjects,'semisters':semister_name['sem'],'cgpa':total_CGPA,'overall':overall,'label':exam_list}

    return JsonResponse(data)
# @login_required(login_url='/')
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request, id):
    #id = json.loads(request.body)['id']
    user = Student.objects.get(pk=id)
    serializer = StudentSerializer(user)
    print(serializer.data)
    return Response(serializer.data)

# @login_required(login_url='/')
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def marks(request):
    if request.method =='POST':
        data = json.loads(request.body)
        sem = data['semister']
        id = data['id']
        if id:
            data = MarksList.objects.filter(Q(student_id=id) & Q(semister=sem))
            mid1 = [[],[]]
            mid2 = [[],[]]
            slip_test = [[],[]]
            sem_total = [[],[]]
            for row in data:
                if str(row.exam_name) == 'Mid Exam -1':
                    mid1[0].append(str(row.subject_name))
                    m = round(int(str(row.marks_scored))*100/25,2)
                    mid1[1].append(m)
                if str(row.exam_name) == 'Mid Exam -2':
                    mid2[0].append(str(row.subject_name))
                    m = round(int(str(row.marks_scored))*100/25,2)
                    mid2[1].append(m)
                if str(row.exam_name) == 'Slip Test':
                    slip_test[0].append(str(row.subject_name))
                    m = round(int(str(row.marks_scored))*100/25,2)
                    slip_test[1].append(m)
                if str(row.exam_name) == 'SEM Exam':
                    sem_total[0].append(str(row.subject_name))
                    m = round(int(str(row.marks_scored))*100/75,2)
                    sem_total[1].append(m)
            return JsonResponse({'mid1':mid1[1],'mid1_label':mid1[0],'mid2_label':mid2[0], 'mid2':mid2[1], 'slip':slip_test[1],'slip_label':slip_test[0],"sem_marks":sem_total[1],'sem_label':sem_total[0],'sem':sem})
    return JsonResponse({'msg':'Request Failed'})


# @login_required(login_url='/')
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def leaderboard(request, dept):
    department = dept
    data = MarksList.objects.filter(Q(exam_name = "SEM Exam") & Q(student_id__department = department)).values('student_id','student_id__student_name').annotate(sem_marks=Avg('marks_scored')/7.5).order_by('-sem_marks')
    data_list = []
    for row in data:
        data_list.append(row)
    return JsonResponse(data_list, safe=False)

# @login_required(login_url='/')
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def faculty(request):
    data = Teacher.objects.all()
    if request.method=='POST':
        value = json.loads(request.body)['search']
        if(value!=""):
            data = Teacher.objects.filter(Q(teacher_name__icontains=value) | Q(teacher_id=value) | Q(phone_number=value))
    serializer = TeacherSerializer(data, many=True)
    return Response(serializer.data)
# @login_required(login_url='/')
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def apply_leave(request, id=None):
    if(request.method=="POST"):
        data = json.loads(request.body)
        role =  data['role']
        reason = data['reason']
        start_date = data['start_date']
        end_date = data['end_date']
        id = data['id']
        new_data = Leaves(candidate_id = id, candidate_type=role,leave_reason=reason, leave_start_date= start_date,leave_end_date=end_date)
        new_data.save()
    data = Leaves.objects.filter(candidate_id = id)
    serializer = LeaveSerializer(data, many=True)
    return Response(serializer.data)

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def get_sem_list(request, id):
    sem_list = MarksList.objects.filter(student_id=id).values_list('semister').distinct()
    sem_list = [i for i in sem_list[0]]
    return JsonResponse(sem_list, safe=False)















    #marks = MarksList.objects.filter(student_id = request.session.get('id'))
    # semisters = []
    # exams = []
    # subjects = []
    # passed = 0
    # failed = 0
    # cgpa = []
    # mid_1 = []
    # mid_2 = []
    # sem_total = []
    # slip_test = []
    # for row in marks:
    #     semisters.append(row.semister)
    #     exams.append(str(row.exam_name))
    #     subjects.append(str(row.subject_name))
    # ##print(str(student.query))
    # semisters = sorted(list(set(semisters)))
    # exams = sorted(list(set(exams)))
    # subjects = list(set(subjects))
    # #print(exams)
    # # #print(subjects)
    # for sub in subjects:
    #     for sem in semisters:
    #         mid1 = 0
    #         mid2 = 0
    #         sem = 0
    #         for row in marks:
    #             if str(row.subject_name) == str(sub):
    #                 if str(row.exam_name) == 'Mid Exam -1':
    #                     mid1 = int(str(row.marks_scored))
    #                     mid_1.append(mid1)
    #                 if str(row.exam_name) == 'Mid Exam -2':
    #                     mid2 = int(str(row.marks_scored))
    #                     mid_2.append(mid2)
    #                 if str(row.exam_name) == 'SEM Exam':
    #                     sem = int(str(row.marks_scored))
    #                     sem_total.append(sem)
    #                 if str(row.exam_name) == 'Slip Test':
    #                     s = int(str(row.marks_scored))
    #                     slip_test.append(s)
    #         mid = (mid1+mid2)//2
    #         if sem<35:
    #             failed+=1
    #         else:
    #             passed+=1
    #         total = sem+mid
    #         cgpa.append(total)
    #                 #SEM Exam
    # cgpa = sum(cgpa)/(10*len(cgpa))
    # mid_1 = ((sum(mid_1)/len(mid_1))/25)*100
    # #print("mid1",mid_1)
    # mid_2 = ((sum(mid_2)//len(mid_2))/25)*100
    # slip_test = ((sum(slip_test)//len(slip_test))/25)*100
    # sem_total = ((sum(sem_total)//len(sem_total))/75)*100
    # #print("semtotal", int(sem_total))