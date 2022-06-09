# Generated by Django 3.2.2 on 2021-12-15 09:58

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('username', models.EmailField(max_length=50, primary_key=True, serialize=False)),
                ('user_type_data', models.CharField(choices=[('STUDENT', 'STUDENT'), ('TEACHER', 'TEACHER')], max_length=20)),
                ('password', models.CharField(max_length=25)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='ExamName',
            fields=[
                ('exam_name', models.CharField(max_length=20, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('subject_id', models.CharField(max_length=50)),
                ('subject_name', models.CharField(max_length=50, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('teacher_name', models.CharField(max_length=50)),
                ('teacher_id', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('phone_number', models.CharField(max_length=20)),
                ('gender', models.CharField(choices=[('MALE', 'M'), ('FEMALE', 'F')], max_length=50)),
                ('profile', models.ImageField(upload_to='profiles/students')),
                ('designation', models.CharField(choices=[('ASSISTANT PROFESSOR', 'Ass Prof'), ('PROFESSOR', 'Prof'), ('Doctarate', 'Dr')], max_length=50)),
                ('teacher_email', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('student_name', models.CharField(max_length=50)),
                ('student_id', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('phone_number', models.CharField(max_length=20)),
                ('gender', models.CharField(choices=[('MALE', 'M'), ('FEMALE', 'F')], max_length=50)),
                ('department', models.CharField(choices=[('MECH', 'MECH'), ('CSE', 'CSE'), ('IT', 'IT'), ('ECE', 'ECE'), ('EEE', 'EEE')], max_length=80)),
                ('profile', models.ImageField(upload_to='profiles/students')),
                ('parent_name', models.CharField(max_length=100)),
                ('parent_mobile_number', models.CharField(max_length=20)),
                ('student_email', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['student_id'],
            },
        ),
        migrations.CreateModel(
            name='MarksList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('marks_scored', models.PositiveIntegerField()),
                ('total_marks', models.PositiveIntegerField()),
                ('exam_name', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='myApp.examname')),
                ('student_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='myApp.student')),
                ('subject_name', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='myApp.subject')),
            ],
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('department_name', models.CharField(choices=[('MECH', 'MECH'), ('CSE', 'CSE'), ('IT', 'IT'), ('ECE', 'ECE'), ('EEE', 'EEE')], max_length=50, primary_key=True, serialize=False)),
                ('department_mail', models.EmailField(max_length=254)),
                ('department_head', models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, to='myApp.teacher')),
            ],
        ),
    ]
