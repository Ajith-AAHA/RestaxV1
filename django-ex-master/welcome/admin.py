from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin


from .models import *

# Register your models here.


class PageViewAdmin(admin.ModelAdmin):
    list_display = ['hostname', 'timestamp']


class TesttableAdmin(admin.ModelAdmin):
    class Meta:
        model = Testtable


admin.site.register(Testtable, TesttableAdmin)

class ClassesViewAdmin(admin.ModelAdmin):

    class Meta:
        model = Classes


class CourseViewAdmin(admin.ModelAdmin):
    class Meta:
        model = Course
		
		
admin.site.register(Course, CourseViewAdmin)
	
class CourseGradeViewAdmin(admin.ModelAdmin):
    class Meta:
        model = CourseGrade
		
admin.site.register(CourseGrade, CourseGradeViewAdmin)



class DepartmentResource(resources.ModelResource):

    class Meta:
        model = Department
		
		
		
class DepartmentViewAdmin(ImportExportModelAdmin):
    resource_class = DepartmentResource
   # list_display = ('department_id', 'name', 'shortcode', 'course_id') 

    class Meta:
        model = Department
		
admin.site.register(Department, DepartmentViewAdmin)




		
		
		
class ExamViewAdmin(admin.ModelAdmin):
    class Meta:
        model = Exam
		
admin.site.register(Exam, ExamViewAdmin)		
		
class ExamResultViewAdmin(admin.ModelAdmin):
    class Meta:
        model = ExamResult


admin.site.register(ExamResult, ExamResultViewAdmin)


class FacultyViewAdmin(admin.ModelAdmin):
    class Meta:
        model = Faculty

admin.site.register(Faculty, FacultyViewAdmin)

class GradeViewAdmin(admin.ModelAdmin):
    class Meta:
        model = Grade


admin.site.register(Grade, GradeViewAdmin)


class LevelsViewAdmin(admin.ModelAdmin):
    class Meta:
        model = Levels


admin.site.register(Levels, LevelsViewAdmin)


class PaperViewAdmin(admin.ModelAdmin):
    class Meta:
        model = Paper

admin.site.register(Paper, PaperViewAdmin)



class SeasonViewAdmin(admin.ModelAdmin):
    class Meta:
        model = Season

admin.site.register(Season, SeasonViewAdmin)



class SeasonOnboardingViewAdmin(admin.ModelAdmin):
    class Meta:
        model = SeasonOnboarding


admin.site.register(SeasonOnboarding, SeasonOnboardingViewAdmin)


class SeatingArrangementViewAdmin(admin.ModelAdmin):
    class Meta:
        model = SeatingArrangement


admin.site.register(SeatingArrangement, SeatingArrangementViewAdmin)



class SeatingBlockViewAdmin(admin.ModelAdmin):
    class Meta:
        model = SeatingBlock

admin.site.register(SeatingBlock, SeatingBlockViewAdmin)




class SeatingRoomViewAdmin(admin.ModelAdmin):
    class Meta:
        model = SeatingRoom

admin.site.register(SeatingRoom, SeatingRoomViewAdmin)



class StudentViewAdmin(admin.ModelAdmin):
    class Meta:
        model = Student

admin.site.register(Student, StudentViewAdmin)



class SyllabusViewAdmin(admin.ModelAdmin):
    class Meta:
        model = Syllabus


admin.site.register(Syllabus, SyllabusViewAdmin)


class SyllabusChapterDetailViewAdmin(admin.ModelAdmin):
    class Meta:
        model = SyllabusChapterDetail

admin.site.register(SyllabusChapterDetail, SyllabusChapterDetailViewAdmin)




class SyllabusSectionDetailViewAdmin(admin.ModelAdmin):
    class Meta:
        model = SyllabusSectionDetail		
	
admin.site.register(SyllabusSectionDetail, SyllabusSectionDetailViewAdmin)


class SyllabusUnitDetailViewAdmin(admin.ModelAdmin):
    class Meta:
        model = SyllabusUnitDetail		
		

admin.site.register(SyllabusUnitDetail, SyllabusUnitDetailViewAdmin)

admin.site.register(Classes, ClassesViewAdmin)


admin.site.register(PageView, PageViewAdmin)



