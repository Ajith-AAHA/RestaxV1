# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=80)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Classes(models.Model):
    id = models.IntegerField(primary_key=True)
    department = models.ForeignKey('Department', models.DO_NOTHING, blank=True, null=True)
    level = models.ForeignKey('Levels', models.DO_NOTHING, blank=True, null=True)
    course = models.ForeignKey('Course', models.DO_NOTHING, blank=True, null=True)
    season = models.ForeignKey('Season', models.DO_NOTHING, blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)
    term = models.IntegerField(blank=True, null=True)
    no_sections = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'classes'


class Course(models.Model):
    course_id = models.IntegerField(primary_key=True)
    course_name = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'course'


class CourseGrade(models.Model):
    id = models.IntegerField(primary_key=True)
    course_id = models.IntegerField(blank=True, null=True)
    department_id = models.IntegerField(blank=True, null=True)
    level_id = models.IntegerField(blank=True, null=True)
    type = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'course_grade'


class Department(models.Model):
    department_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    shortcode = models.CharField(max_length=45, blank=True, null=True)
    course = models.ForeignKey(Course, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'department'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Exam(models.Model):
    exam_id = models.IntegerField(primary_key=True)
    course_id = models.IntegerField(blank=True, null=True)
    season_id = models.IntegerField(blank=True, null=True)
    exam_name = models.CharField(max_length=255, blank=True, null=True)
    exam_type = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=45, blank=True, null=True)
    paper_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'exam'


class ExamResult(models.Model):
    id = models.IntegerField(primary_key=True)
    paper = models.ForeignKey('Paper', models.DO_NOTHING, blank=True, null=True)
    student = models.ForeignKey('Student', models.DO_NOTHING, blank=True, null=True)
    grade = models.ForeignKey('Grade', models.DO_NOTHING, blank=True, null=True)
    result = models.CharField(max_length=45, blank=True, null=True)
    status = models.CharField(max_length=45, blank=True, null=True)
    score = models.IntegerField(blank=True, null=True)
    state = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'exam_result'


class Faculty(models.Model):
    id = models.IntegerField(primary_key=True)
    course = models.ForeignKey(Course, models.DO_NOTHING, blank=True, null=True)
    department = models.ForeignKey(Department, models.DO_NOTHING, blank=True, null=True)
    faculty_id = models.CharField(max_length=45, blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=45, blank=True, null=True)
    password = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'faculty'


class Grade(models.Model):
    id = models.IntegerField(primary_key=True)
    department = models.ForeignKey(Department, models.DO_NOTHING, blank=True, null=True)
    couse = models.ForeignKey(Course, models.DO_NOTHING, blank=True, null=True)
    range_upper = models.FloatField(blank=True, null=True)
    range_lower = models.FloatField(blank=True, null=True)
    grade_name = models.CharField(max_length=45, blank=True, null=True)
    level = models.ForeignKey('Levels', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'grade'


class Levels(models.Model):
    level_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    shortcode = models.CharField(max_length=45, blank=True, null=True)
    year = models.CharField(max_length=45, blank=True, null=True)
    terms = models.CharField(max_length=45, blank=True, null=True)
    course = models.ForeignKey(Course, models.DO_NOTHING, blank=True, null=True)
    department = models.ForeignKey(Department, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'levels'


class Paper(models.Model):
    paper_id = models.IntegerField(primary_key=True)
    shortcode = models.CharField(max_length=255, blank=True, null=True)
    paper_name = models.CharField(max_length=255, blank=True, null=True)
    credits = models.IntegerField(blank=True, null=True)
    department = models.ForeignKey(Department, models.DO_NOTHING, blank=True, null=True)
    level = models.ForeignKey(Levels, models.DO_NOTHING, blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)
    term = models.IntegerField(blank=True, null=True)
    type = models.CharField(max_length=45, blank=True, null=True)
    course = models.ForeignKey(Course, models.DO_NOTHING, blank=True, null=True)
    faculty = models.ForeignKey(Faculty, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'paper'


class Season(models.Model):
    id = models.IntegerField(primary_key=True)
    course = models.ForeignKey(Course, models.DO_NOTHING, blank=True, null=True)
    academic_year = models.CharField(max_length=45, blank=True, null=True)
    season_name = models.CharField(max_length=45, blank=True, null=True)
    status = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'season'


class SeasonOnboarding(models.Model):
    id = models.IntegerField(primary_key=True)
    season_id = models.IntegerField(blank=True, null=True)
    student_id = models.IntegerField(blank=True, null=True)
    papers_undertaking = models.CharField(max_length=45, blank=True, null=True)
    supplementary_papers = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'season_onboarding'


class SeatingArrangement(models.Model):
    id = models.IntegerField(primary_key=True)
    room = models.ForeignKey('SeatingRoom', models.DO_NOTHING, blank=True, null=True)
    no_rows = models.IntegerField(blank=True, null=True)
    no_columns = models.IntegerField(blank=True, null=True)
    no_seats = models.IntegerField(blank=True, null=True)
    a_b_seats = models.CharField(db_column='A_B_seats', max_length=45, blank=True, null=True)  # Field name made lowercase.
    no_proctors = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'seating_arrangement'


class SeatingBlock(models.Model):
    block_id = models.IntegerField(primary_key=True)
    block_name = models.CharField(max_length=255, blank=True, null=True)
    shortcode = models.CharField(max_length=45, blank=True, null=True)
    nos_floors = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'seating_block'


class SeatingRoom(models.Model):
    room_id = models.IntegerField(primary_key=True)
    room_name = models.CharField(max_length=45, blank=True, null=True)
    block = models.ForeignKey(SeatingBlock, models.DO_NOTHING, blank=True, null=True)
    floor_no = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'seating_room'


class Student(models.Model):
    id = models.IntegerField(primary_key=True)
    roll_no = models.CharField(max_length=45, blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    course = models.ForeignKey(Course, models.DO_NOTHING, blank=True, null=True)
    department = models.ForeignKey(Department, models.DO_NOTHING, blank=True, null=True)
    level = models.ForeignKey(Levels, models.DO_NOTHING, blank=True, null=True)
    batch = models.CharField(max_length=45, blank=True, null=True)
    mobile_no = models.CharField(max_length=45, blank=True, null=True)
    password = models.CharField(max_length=45, blank=True, null=True)
    institute = models.CharField(max_length=45, blank=True, null=True)
    status = models.CharField(max_length=45, blank=True, null=True)
    detained = models.CharField(max_length=45, blank=True, null=True)
    season = models.ForeignKey(Season, models.DO_NOTHING, blank=True, null=True)
    section = models.IntegerField(blank=True, null=True)
    papers = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'student'


class Syllabus(models.Model):
    syllabus_id = models.IntegerField(primary_key=True)
    paper = models.ForeignKey(Paper, models.DO_NOTHING, blank=True, null=True)
    nos_units = models.IntegerField(blank=True, null=True)
    nos_chapters = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'syllabus'


class SyllabusChapterDetail(models.Model):
    id = models.IntegerField(primary_key=True)
    chapter_no = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    unit = models.ForeignKey('SyllabusUnitDetail', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'syllabus_chapter_detail'


class SyllabusSectionDetail(models.Model):
    id = models.IntegerField(primary_key=True)
    chapter = models.ForeignKey(SyllabusChapterDetail, models.DO_NOTHING, blank=True, null=True)
    section_no = models.IntegerField(blank=True, null=True)
    section_name = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'syllabus_section_detail'


class SyllabusUnitDetail(models.Model):
    id = models.IntegerField(primary_key=True)
    syllabus = models.ForeignKey(Syllabus, models.DO_NOTHING, blank=True, null=True)
    unit_name = models.CharField(max_length=255, blank=True, null=True)
    unit_no = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'syllabus_unit_detail'


class WelcomePageview(models.Model):
    hostname = models.CharField(max_length=32)
    timestamp = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'welcome_pageview'
