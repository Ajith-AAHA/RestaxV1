from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin
from rest_framework import routers
from welcome import views


router = routers.DefaultRouter()
router.register(r'courses', views.CourseViewSet)
router.register(r'departments', views.DepartmentViewSet)
router.register(r'students', views.StudentViewSet)
router.register(r'classes', views.ClassesViewSet)
router.register(r'exams', views.ExamViewSet)
router.register(r'faculty', views.FacultyViewSet)
router.register(r'levels', views.LevelViewSet)
router.register(r'papers', views.PaperViewSet)
router.register(r'seatingblock', views.SeatingBlockViewSet)
router.register(r'seasons', views.SeasonViewSet)
router.register(r'syllabus', views.SyllabusViewSet)


urlpatterns = [
    # Examples:
    # url(r'^$', 'project.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
	url(r'^rest-auth/', include('rest_auth.urls')),
	url('', include(router.urls)),
	url(r'^api-auth/', include('rest_framework.urls')),
   # url(r'^$', index),
  #  url(r'^health$', health),
    url(r'^admin/', include(admin.site.urls)),
	url('djrichtextfield/', include('djrichtextfield.urls'))
]


