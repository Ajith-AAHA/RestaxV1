import os
from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse


from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from welcome.serializers import *


from . import database
from .models import *

# Create your views here.

def index(request):
    hostname = os.getenv('HOSTNAME', 'unknown')
    PageView.objects.create(hostname=hostname)

    return render(request, 'welcome/index.html', {
        'hostname': hostname,
        'database': database.info(),
        'count': PageView.objects.count()
    })

def health(request):
    return HttpResponse(PageView.objects.count())




class CourseViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Course.objects.all().order_by('course_id')
    serializer_class = CourseSerializer


class DepartmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Department.objects.all().order_by("-department_id")
    serializer_class = DepartmentSerializer
	
	
	
class StudentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Student.objects.all().order_by('-id')
    serializer_class = StudentSerializer







class ClassesViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Classes.objects.all()
    serializer_class = ClassesSerializer


class ExamViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer
	
	
	
class FacultyViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer






class LevelViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Levels.objects.all()
    serializer_class = LevelSerializer


class PaperViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Paper.objects.all()
    serializer_class = PaperSerializer
	
	
	
class SeatingBlockViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = SeatingBlock.objects.all()
    serializer_class = SeatingBlockSerializer



class SeasonViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer
	
	
	
class SyllabusViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Syllabus.objects.all()
    serializer_class = SyllabusSerializer


