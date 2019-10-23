from __future__ import unicode_literals
from djrichtextfield.models import RichTextField
from django.db import models
# Create your models here.

class PageView(models.Model):
    hostname = models.CharField(max_length=32)
    timestamp = models.DateTimeField(auto_now_add=True)


# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `# managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.




class Classes(models.Model):
    id = models.IntegerField(primary_key=True)
    department = models.ForeignKey('Department', on_delete=models.CASCADE, blank=True, null=True)
    level = models.ForeignKey('Levels', on_delete=models.CASCADE, blank=True, null=True)
    course = models.ForeignKey('Course', on_delete=models.CASCADE, blank=True, null=True)
    season = models.ForeignKey('Season', on_delete=models.CASCADE, blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)
    term = models.IntegerField(blank=True, null=True)
    no_sections = models.IntegerField(blank=True, null=True)
    students = models.ManyToManyField('Student')
    def __str__(self):
        return self.id 
		
		
    class Meta:
        # managed = False
        db_table = 'classes'


class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=45, unique = True)
    #content = RichTextField()
    def __str__(self):
        return self.course_name 
    
    
	
    class Meta:
        # managed = False
        db_table = 'course'

		

class Testtable(models.Model):
    auto_increment_id = models.AutoField(primary_key=True, default = 1)
    age = models.IntegerField(blank=True, null=True) 
    name = models.CharField(max_length=45, blank=True, null=True)
    #content = RichTextField()
    def __str__(self):
        return self.id 
    
    
	
    class Meta:
        # managed = False
        db_table = 'Testtable'

	


class CourseGrade(models.Model):
    id = models.AutoField(primary_key=True)
    course = models.ForeignKey('Course', on_delete=models.CASCADE, blank=True, null=True)
    department = models.ForeignKey('Department', on_delete=models.CASCADE, blank=True, null=True)
    level = models.ForeignKey('Levels', on_delete=models.CASCADE, blank=True, null=True)
    type = models.CharField(max_length=45, blank=True, null=True)
    def __str__(self):
        return self.id 
    class Meta:
        # managed = False
        db_table = 'course_grade'


class Department(models.Model):
    department_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    shortcode = models.CharField(max_length=45)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)
	                                                  
	
    
    def __str__(self):
        return unicode(self.name)
		
		
    class Meta:
        # managed = False
        db_table = 'department'






class Exam(models.Model):
    exam_id = models.AutoField(primary_key=True)
    course = models.ForeignKey('Course', models.CASCADE, blank=True, null=True)
    season = models.ForeignKey('Season', models.CASCADE, blank=True, null=True)
    exam_name = models.CharField(max_length=255, blank=True, null=True)
    exam_type = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=45, blank=True, null=True)
    paper = models.ForeignKey('Paper', models.CASCADE, blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'exam'


class ExamResult(models.Model):
    id = models.IntegerField(primary_key=True)
    paper = models.ForeignKey('Paper', models.CASCADE, blank=True, null=True)
    student = models.ForeignKey('Student', models.CASCADE, blank=True, null=True)
    grade = models.ForeignKey('Grade', models.CASCADE, blank=True, null=True)
    result = models.CharField(max_length=45, blank=True, null=True)
    status = models.CharField(max_length=45, blank=True, null=True)
    score = models.IntegerField(blank=True, null=True)
    state = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'exam_result'


class Faculty(models.Model):
    id = models.AutoField(primary_key=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, blank=True, null=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, blank=True, null=True)
    faculty_id = models.CharField(max_length=45, blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=45, blank=True, null=True)
    password = models.CharField(max_length=45, blank=True, null=True)

    def __str__(self):
        return self.name 
    class Meta:
        # managed = False
        db_table = 'faculty'


class Grade(models.Model):
    id = models.IntegerField(primary_key=True)
    department = models.ForeignKey(Department, models.CASCADE, blank=True, null=True)
    couse = models.ForeignKey(Course, models.CASCADE, blank=True, null=True)
    range_upper = models.FloatField(blank=True, null=True)
    range_lower = models.FloatField(blank=True, null=True)
    grade_name = models.CharField(max_length=45, blank=True, null=True)
    level = models.ForeignKey('Levels', models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.id 

    class Meta:
        # managed = False
        db_table = 'grade'


class Levels(models.Model):
    level_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    shortcode = models.CharField(max_length=45)
    year = models.CharField(max_length=45, blank=True, null=True)
    terms = models.CharField(max_length=45, blank=True, null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.shortcode) 


    class Meta:
        # managed = False
        db_table = 'levels'


class Paper(models.Model):
    paper_id = models.AutoField(primary_key=True)
    shortcode = models.CharField(max_length=255, blank=True, null=True)
    paper_name = models.CharField(max_length=255, blank=True, null=True)
    credits = models.IntegerField(blank=True, null=True)
    department = models.ForeignKey(Department, models.CASCADE, blank=True, null=True)
    level = models.ForeignKey(Levels, models.CASCADE, blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)
    term = models.IntegerField(blank=True, null=True)
    type = models.CharField(max_length=45, blank=True, null=True)
    course = models.ForeignKey(Course, models.CASCADE, blank=True, null=True)
    faculty = models.ForeignKey(Faculty, models.CASCADE, blank=True, null=True)


    def __str__(self):
        return str(self.paper_id) + " -  "+ str(self.paper_name)

    
    class Meta:
        # managed = False
        db_table = 'paper'


class Season(models.Model):
    id = models.IntegerField(primary_key=True)
    course = models.ForeignKey(Course, models.DO_NOTHING, blank=True, null=True)
    academic_year = models.CharField(max_length=45, blank=True, null=True)
    season_name = models.CharField(max_length=45, blank=True, null=True)
    status = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'season'


class SeasonOnboarding(models.Model):
    id = models.IntegerField(primary_key=True)
    season_id = models.IntegerField(blank=True, null=True)
    student_id = models.IntegerField(blank=True, null=True)
    papers_undertaking = models.CharField(max_length=45, blank=True, null=True)
    supplementary_papers = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'season_onboarding'


class SeatingArrangement(models.Model):
    id = models.AutoField(primary_key=True)
    room = models.ForeignKey('SeatingRoom', models.CASCADE, blank=True, null=True)
    no_rows = models.IntegerField(blank=True, null=True)
    no_columns = models.IntegerField(blank=True, null=True)
    no_seats = models.IntegerField(blank=True, null=True)
    a_b_seats = models.CharField(db_column='A_B_seats', max_length=45, blank=True, null=True)  # Field name made lowercase.
    no_proctors = models.IntegerField(blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'seating_arrangement'


class SeatingBlock(models.Model):
    block_id = models.AutoField(primary_key=True)
    block_name = models.CharField(max_length=255, blank=True, null=True)
    shortcode = models.CharField(max_length=45, blank=True, null=True)
    nos_floors = models.IntegerField(blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'seating_block'


class SeatingRoom(models.Model):
    room_id = models.AutoField(primary_key=True)
    room_name = models.CharField(max_length=45, blank=True, null=True)
    block = models.ForeignKey(SeatingBlock, models.CASCADE, blank=True, null=True)
    floor_no = models.IntegerField(blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'seating_room'


class Student(models.Model):
    id = models.AutoField(primary_key=True)
    roll_no = models.CharField(max_length=45, blank=True, null=True, unique= True)
    name = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    course = models.ForeignKey(Course, models.CASCADE, blank=True, null=True)
    department = models.ForeignKey(Department, models.CASCADE, blank=True, null=True)
    level = models.ForeignKey(Levels, models.CASCADE, blank=True, null=True)
    batch = models.CharField(max_length=45, blank=True, null=True)
    mobile_no = models.CharField(max_length=45, blank=True, null=True)
    password = models.CharField(max_length=45, blank=True, null=True)
    institute = models.CharField(max_length=45, blank=True, null=True)
    status = models.CharField(max_length=45, blank=True, null=True)
    detained = models.CharField(max_length=45, blank=True, null=True)
    season = models.ForeignKey(Season, models.CASCADE, blank=True, null=True)
    section = models.IntegerField(blank=True, null=True)
    papers = models.ManyToManyField(Paper)

    def __str__(self):
        return self.roll_no


    class Meta:
        # managed = False
        db_table = 'student'


class Syllabus(models.Model):
    syllabus_id = models.AutoField(primary_key=True)
    paper = models.ForeignKey(Paper, models.CASCADE, blank=True, null=True)
    nos_units = models.IntegerField(blank=True, null=True)
    nos_chapters = models.IntegerField(blank=True, null=True)
	
    def __str__(self):
        return str(self.syllabus_id) + "  -  " + str(self.paper.paper_name)

    class Meta:
        # managed = False
        db_table = 'syllabus'


class SyllabusChapterDetail(models.Model):
    id = models.IntegerField(primary_key=True)
    chapter_no = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    unit = models.ForeignKey('SyllabusUnitDetail', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'syllabus_chapter_detail'


class SyllabusSectionDetail(models.Model):
    id = models.IntegerField(primary_key=True)
    chapter = models.ForeignKey(SyllabusChapterDetail, models.DO_NOTHING, blank=True, null=True)
    section_no = models.IntegerField(blank=True, null=True)
    section_name = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'syllabus_section_detail'


class SyllabusUnitDetail(models.Model):
    id = models.IntegerField(primary_key=True)
    syllabus = models.ForeignKey(Syllabus, models.DO_NOTHING, blank=True, null=True)
    unit_name = models.CharField(max_length=255, blank=True, null=True)
    unit_no = models.IntegerField(blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'syllabus_unit_detail'
