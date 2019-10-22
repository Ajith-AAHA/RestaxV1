from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import *

class CourseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Course
        fields = ['course_id', 'course_name']


class DepartmentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Department
        fields = ['department_id', 'name',  'course', 'shortcode']
		
		
		
		
class StudentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'roll_no', 'name', 'batch', "mobile_no"]
		
		
		
		
		
class ClassesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Classes
        fields = ['id', 'department', 'level', 'course', 'season', 'no_sections', 'year', 'term']


class ExamSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Exam
        fields = ['exam_id', 'course_id', 'season_id', 'exam_name', 'paper_id']
		
		
		
		
class FacultySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Faculty
        fields = ['id', 'faculty_id', 'course', 'department']
		
		

		
		
class LevelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Levels
        fields = ['level_id', 'name', 'shortcode',  'course', 'department']
		
		
		
		
		
class PaperSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Paper
        fields = ['paper_id', 'paper_name', 'shortcode',  'course', 'department', 'faculty']
		
		
				

		

		
class SeatingBlockSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SeatingBlock
        fields = ['block_id',  'block_name', 'shortcode', 'nos_floors']
		

		
class SeasonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Season
        fields = ['id',  'course', 'season_name']
		
		

class SyllabusSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Syllabus
        fields = ['syllabus_id',  'nos_units', 'nos_chapters', 'paper']
		
		
		
