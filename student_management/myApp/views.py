import json
from django.shortcuts import render, redirect
from .models import *
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from rest_framework.authtoken.models import Token
# from myApp.EmailBackend import EmailBackend
# Create your views here.
def Home(request):
    request.session['is_active'] = 'home'
    return render(request,'home/home.html')
def Academics(request):
    request.session['is_active'] = 'ac'
    return render(request,'home/academics.html')
def Departments(request):
    request.session['is_active'] = 'dept'
    return render(request, 'home/departments.html')
def About(request):
    request.session['is_active'] = 'about'
    return render(request, 'home/about.html')
def Facilities(request):
    request.session['is_active'] = 'faci'
    return render(request,'home/facilities.html')
def loggin(request):
    return render(request, 'home/login.html')
@api_view(['POST'])
def logged(request):
    if request.method == 'POST':
        login_data = json.loads(request.body)
        #print(request.body)
        email = login_data['email']
        pas = login_data['password']
        print(email, pas)
        try:
            user = User.objects.get(username=email, password=pas)
            token, _ = Token.objects.get_or_create(user=user)
            username = user.username
            print("username", username, type(email))

            login(request, user)
            print("user type",user.user_type_data)
            if user.user_type_data=="STUDENT":
                student = Student.objects.filter(student_email=email).first()
                data = {'token': token.key, 'id': student.student_id, 'url': student.profile.url, 'name': student.student_name, 'department': student.department, 'role': "STUDENT"}
                print(data)
            else:
                teacher = Teacher.objects.filter(teacher_email=email).first()
                data = {'token': token.key, 'id': teacher.teacher_id, 'url': teacher.profile.url, 'name': teacher.teacher_name, 'department': teacher.department_name, 'role': user.user_type_data}

            return JsonResponse(data)
        except Exception as e:
            print(e)
            return HttpResponse("Please Enter valid details")
@api_view(['GET'])
def logout_user(request):

    logout(request)
    return Response({'msg':"SuccessfullyLogout"},200)

