from email.policy import default
from django.db import models
from django.contrib.auth.models import AbstractUser
GENDER_CHOICES = (
    ('MALE', 'M'),
    ('FEMALE', 'F')
)
DEPARTMENT_CHOICES = (
    ('MECH', 'MECH'),
    ('CSE', 'CSE'),
    ('IT', 'IT'),
    ('ECE', 'ECE'),
    ('EEE', "EEE")
)
DESIGNATION_CHOICES = (
    ('ASSISTANT PROFESSOR','Ass Prof'),
    ('PROFESSOR', 'Prof'),
    ('Doctarate','Dr')
)

SEMISTER_CHOICES = (
    ('1','1'),
    ('2', '2'),
    ('3', '3'),
    ('4', '4'),
    ('5','5'),
    ('6', '6'),
    ('7', '7'),
    ('8', '8')
)
LEAVE_STATUS = (
    ('PENDING','PENDING'),
    ('APPROVED','APPROVED'),
    ('REJECTED','REJECTED')
)
class User(AbstractUser):
    username = models.EmailField(max_length=50, primary_key=True)
    CANDIDATE_ROLE = (
    ('STUDENT', 'STUDENT'),
    ('TEACHER', 'TEACHER'),
    ('HOD','HOD')
    )
    user_type_data = models.CharField(max_length=20, choices=CANDIDATE_ROLE)
    password = models.CharField(max_length=25)

    def __str__(self):
        return self.username
class Student(models.Model):
    student_name = models.CharField(max_length=50)
    student_id = models.CharField(max_length=10, primary_key=True)
    student_email = models.OneToOneField("User",on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20)
    gender = models.CharField(choices=GENDER_CHOICES, max_length=50)
    department = models.CharField(max_length=80, choices=DEPARTMENT_CHOICES)
    profile = models.ImageField(upload_to='profiles/students', null=True)
    parent_name = models.CharField(max_length=100)
    parent_mobile_number = models.CharField(max_length=20)

    def __str__(self):
        return self.student_id

    class Meta:
        ordering = ['student_id']
class Teacher(models.Model):
    teacher_name = models.CharField(max_length=50)
    teacher_id = models.CharField(max_length=10, primary_key=True)
    teacher_email = models.OneToOneField("User",on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20)
    gender = models.CharField(choices=GENDER_CHOICES, max_length=50)
    profile = models.ImageField(upload_to='profiles/students')
    designation = models.CharField(max_length=50, choices=DESIGNATION_CHOICES, default="'Ass Prof'")
    department_name = models.CharField(max_length=6, choices=DEPARTMENT_CHOICES)
    def __str__(self):
        return self.teacher_id
    class Meta:
        ordering = ['teacher_id']
class Department(models.Model):
    department_name = models.CharField(max_length=50, choices=DEPARTMENT_CHOICES, primary_key=True)
    department_mail = models.EmailField(max_length=254)
    department_head = models.OneToOneField("Teacher", on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.department_name


class Subject(models.Model):
    subject_name = models.CharField(primary_key=True, max_length=50)
    def __str__(self):
        return self.subject_name

class ExamName(models.Model):
    exam_name = models.CharField(max_length=20, primary_key=True)

    def __str__(self):
        return self.exam_name

class MarksList(models.Model):
    student_id = models.ForeignKey("Student", on_delete=models.DO_NOTHING)
    semister = models.CharField(max_length=1, choices=SEMISTER_CHOICES)
    exam_name = models.ForeignKey("ExamName", on_delete=models.DO_NOTHING)
    subject_name = models.ForeignKey("Subject", on_delete=models.DO_NOTHING)
    marks_scored = models.PositiveIntegerField()
    total_marks = models.PositiveIntegerField()

    def __str__(self):
        return str(self.student_id)

class Leaves(models.Model):
    candidate_id = models.CharField(max_length=15)
    candidate_type = models.CharField(max_length=15)
    leave_reason = models.CharField(max_length=350)
    leave_start_date = models.DateField(auto_now=False, auto_now_add=False)
    leave_end_date = models.DateField(auto_now=False, auto_now_add=False)
    status = models.CharField(default='PENDING', max_length=50, choices=LEAVE_STATUS)
    def __str__(self):
        return self.candidate_id

