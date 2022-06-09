from cmath import e
import json
from .models import *
from .serializers import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import JsonResponse
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def leaves(request, user_type):
    if(request.method=="POST"):
        values = json.loads(request.body)
        query = Leaves.objects.get(pk=values['id'])
        query.status = values['status']
        query.save()
    pending = Leaves.objects.filter(Q(candidate_type=user_type) & Q(status="PENDING"))
    remaining = Leaves.objects.filter(Q(candidate_type=user_type) & ~Q(status="PENDING"))
    serializer1 = LeaveSerializer(pending, many=True)
    serializer12 = LeaveSerializer(remaining, many=True)
    return Response({"pending":serializer1.data,"remaining":serializer12.data})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request,id):
    try:
        user = User.objects.get(pk=id)
        found = True
    except:
        found = False
    return JsonResponse({'found':found})
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_candidate(request,value):
    found = False
    try:
        student = Student.objects.filter(Q(student_id=value) | Q(phone_number=value)).first()
        teacher = Teacher.objects.filter(Q(teacher_id=value) | Q(phone_number=value)).first()
        if student or teacher:
            found = True
    except:
        found = False
    return JsonResponse({'found':found})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def register_Candidate(request):
    data = json.loads(request.body)
    user = User(username = data['email'],user_type_data=data['user_type'], password=data['password'])
    if(data['user_type']=="STUDENT"):
        user.save()
        student = Student(student_id=data['id'], student_name=data['name'],student_email = user,phone_number=data['mobile'],gender=data['gender'],department=data['department'],parent_name=data['parent_name'], parent_mobile_number= data['parent_number'])
        student.save()
        return Response(StudentSerializer(student).data)
    if(data['user_type']=="TEACHER"):
        user.save()
        teacher = Teacher(teacher_id=data['id'], teacher_name=data['name'], teacher_email = user,phone_number=data['mobile'],gender=data['gender'],department_name=data['department'])
        teacher.save()
    return JsonResponse({"msg":"successfull"})

