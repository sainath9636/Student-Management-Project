from dataclasses import fields
from pyexpat import model
from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from .models import User, Teacher, MarksList, Department,Subject, ExamName,Leaves, Student

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username','user_type_data','password']

class StudentSerializer(ModelSerializer):
    student_email = PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Student
        fields = '__all__'

class TeacherSerializer(ModelSerializer):
    teacher_email = PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Teacher
        fields = '__all__'

class MarksListSerializer(ModelSerializer):
    class Meta:
        model= MarksList
        fields='__all__'

class DepartmentSerializer(ModelSerializer):
    department_head = TeacherSerializer(required=True)
    class Meta:
        model = Department
        fields = '__all__'
class SubjectSerializer(ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'

class ExamNameSerializer(ModelSerializer):
    class Meta:
        model = ExamName
        fields = '__all__'

class LeaveSerializer(ModelSerializer):
    class Meta:
        model = Leaves
        fields = ['id','candidate_id','candidate_type','leave_reason','leave_start_date','leave_end_date','status']