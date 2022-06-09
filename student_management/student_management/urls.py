"""college_Management URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from myApp import views, StudentViews, StaffViews, HodViews
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', views.Home, name='home'),
    # path('academics/', views.Academics, name='academics'),
    # path('about/', views.About, name='about_us'),
    # path('departments/', views.Departments, name='departments'),
    # path('facilities', views.Facilities, name='facilities'),
    # path('login/', views.loggin, name='login'),
    path('login/', views.logged, name='logged'),
    path('logout/', views.logout_user, name='logout'),
    #Student Urls------------------------
    path('student-dashboard/<str:id>', StudentViews.home, name='student_home'),
    path('student_profile/<str:id>', StudentViews.profile, name='student_profile'),
    path('student_marks/', StudentViews.marks, name='student_mark'),
    path('student_leaderboard/<str:dept>', StudentViews.leaderboard, name='student_leaderboard'),
    path('faculty-info/', StudentViews.faculty, name='faculty-info'),
    path('apply_leave_stu/',StudentViews.apply_leave, name='apply_leave_stu'),
    path('view_all_leaves/<str:id>',StudentViews.apply_leave, name='view_all_leaves'),
    path("get_sem_list/<str:id>",StudentViews.get_sem_list, name="sem_list"),

    #-----------------------Staff--------------------------
    path('staff_search/', StaffViews.search_student, name='search_student'),
    path('staff_profile/<str:id>', StaffViews.staff_profile, name='staff_profile'),
    path('leaves/<str:user_type>', HodViews.leaves, name='pending_leaves'),
    path('getUser/<str:id>', HodViews.get_user, name='get_user'),
    path('getCandidate/<str:value>', HodViews.get_candidate, name='get_Candidate'),
    path('register_candidate/', HodViews.register_Candidate, name='register_Candidate'),


]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)