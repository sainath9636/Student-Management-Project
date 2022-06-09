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
def search_student(request):
    if request.method == "POST":
        value = json.loads(request.body)["search"]
        data = Student.objects.filter(Q(student_name__icontains=value) | Q(student_id=value) | Q(student_email=value) | Q(phone_number=value) | Q(parent_mobile_number=value))
    else:
        data = Student.objects.all()
    serializer = StudentSerializer(data, many=True)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def staff_profile(request, id):
    data = Teacher.objects.get(teacher_id=id)
    serializer = TeacherSerializer(data)
    return Response(serializer.data)