from django.contrib import admin
from .models import User, Teacher, Student, Department, Subject, MarksList, ExamName,Leaves
# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'user_type_data', 'is_staff']
    list_filter = ['user_type_data']

@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ['teacher_id', 'teacher_name', 'teacher_email', 'phone_number', 'gender','department_name']
    list_filter = ['department_name']

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['student_id', 'student_name', 'student_email', 'department', 'phone_number', 'gender']
    list_filter = ['department', 'gender']

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ['department_name', 'department_head', 'department_mail']

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ['subject_name']

@admin.register(ExamName)
class ExamNameAdmin(admin.ModelAdmin):
    list_display = ['exam_name']

@admin.register(MarksList)
class MarksListAdmin(admin.ModelAdmin):
    list_display = ['student_id', 'semister','exam_name','subject_name', 'marks_scored']
    list_filter = ['semister', 'exam_name', 'subject_name']

@admin.register(Leaves)
class LeavesAdmin(admin.ModelAdmin):
    list_display = ['id','candidate_id','candidate_type','leave_reason','leave_start_date','leave_end_date','status']
    list_filter = ['status','candidate_type']