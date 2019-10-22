# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2019-10-22 07:41
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Classes',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('year', models.IntegerField(blank=True, null=True)),
                ('term', models.IntegerField(blank=True, null=True)),
                ('no_sections', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'classes',
            },
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('course_id', models.AutoField(primary_key=True, serialize=False)),
                ('course_name', models.CharField(max_length=45, unique=True)),
            ],
            options={
                'db_table': 'course',
            },
        ),
        migrations.CreateModel(
            name='CourseGrade',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('type', models.CharField(blank=True, max_length=45, null=True)),
                ('course', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Course')),
            ],
            options={
                'db_table': 'course_grade',
            },
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('department_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('shortcode', models.CharField(max_length=45)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='welcome.Course')),
            ],
            options={
                'db_table': 'department',
            },
        ),
        migrations.CreateModel(
            name='Exam',
            fields=[
                ('exam_id', models.AutoField(primary_key=True, serialize=False)),
                ('exam_name', models.CharField(blank=True, max_length=255, null=True)),
                ('exam_type', models.CharField(blank=True, max_length=255, null=True)),
                ('status', models.CharField(blank=True, max_length=45, null=True)),
                ('course', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Course')),
            ],
            options={
                'db_table': 'exam',
            },
        ),
        migrations.CreateModel(
            name='ExamResult',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('result', models.CharField(blank=True, max_length=45, null=True)),
                ('status', models.CharField(blank=True, max_length=45, null=True)),
                ('score', models.IntegerField(blank=True, null=True)),
                ('state', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'exam_result',
            },
        ),
        migrations.CreateModel(
            name='Faculty',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('faculty_id', models.CharField(blank=True, max_length=45, null=True)),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('email', models.CharField(blank=True, max_length=255, null=True)),
                ('phone', models.CharField(blank=True, max_length=45, null=True)),
                ('password', models.CharField(blank=True, max_length=45, null=True)),
                ('course', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Course')),
                ('department', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Department')),
            ],
            options={
                'db_table': 'faculty',
            },
        ),
        migrations.CreateModel(
            name='Grade',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('range_upper', models.FloatField(blank=True, null=True)),
                ('range_lower', models.FloatField(blank=True, null=True)),
                ('grade_name', models.CharField(blank=True, max_length=45, null=True)),
                ('couse', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Course')),
                ('department', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Department')),
            ],
            options={
                'db_table': 'grade',
            },
        ),
        migrations.CreateModel(
            name='Levels',
            fields=[
                ('level_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('shortcode', models.CharField(max_length=45)),
                ('year', models.CharField(blank=True, max_length=45, null=True)),
                ('terms', models.CharField(blank=True, max_length=45, null=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='welcome.Course')),
                ('department', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='welcome.Department')),
            ],
            options={
                'db_table': 'levels',
            },
        ),
        migrations.CreateModel(
            name='PageView',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hostname', models.CharField(max_length=32)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Paper',
            fields=[
                ('paper_id', models.AutoField(primary_key=True, serialize=False)),
                ('shortcode', models.CharField(blank=True, max_length=255, null=True)),
                ('paper_name', models.CharField(blank=True, max_length=255, null=True)),
                ('credits', models.IntegerField(blank=True, null=True)),
                ('year', models.IntegerField(blank=True, null=True)),
                ('term', models.IntegerField(blank=True, null=True)),
                ('type', models.CharField(blank=True, max_length=45, null=True)),
                ('course', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Course')),
                ('department', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Department')),
                ('faculty', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Faculty')),
                ('level', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Levels')),
            ],
            options={
                'db_table': 'paper',
            },
        ),
        migrations.CreateModel(
            name='Season',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('academic_year', models.CharField(blank=True, max_length=45, null=True)),
                ('season_name', models.CharField(blank=True, max_length=45, null=True)),
                ('status', models.CharField(blank=True, max_length=45, null=True)),
                ('course', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='welcome.Course')),
            ],
            options={
                'db_table': 'season',
            },
        ),
        migrations.CreateModel(
            name='SeasonOnboarding',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('season_id', models.IntegerField(blank=True, null=True)),
                ('student_id', models.IntegerField(blank=True, null=True)),
                ('papers_undertaking', models.CharField(blank=True, max_length=45, null=True)),
                ('supplementary_papers', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'season_onboarding',
            },
        ),
        migrations.CreateModel(
            name='SeatingArrangement',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('no_rows', models.IntegerField(blank=True, null=True)),
                ('no_columns', models.IntegerField(blank=True, null=True)),
                ('no_seats', models.IntegerField(blank=True, null=True)),
                ('a_b_seats', models.CharField(blank=True, db_column='A_B_seats', max_length=45, null=True)),
                ('no_proctors', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'seating_arrangement',
            },
        ),
        migrations.CreateModel(
            name='SeatingBlock',
            fields=[
                ('block_id', models.AutoField(primary_key=True, serialize=False)),
                ('block_name', models.CharField(blank=True, max_length=255, null=True)),
                ('shortcode', models.CharField(blank=True, max_length=45, null=True)),
                ('nos_floors', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'seating_block',
            },
        ),
        migrations.CreateModel(
            name='SeatingRoom',
            fields=[
                ('room_id', models.AutoField(primary_key=True, serialize=False)),
                ('room_name', models.CharField(blank=True, max_length=45, null=True)),
                ('floor_no', models.IntegerField(blank=True, null=True)),
                ('block', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.SeatingBlock')),
            ],
            options={
                'db_table': 'seating_room',
            },
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('roll_no', models.CharField(blank=True, max_length=45, null=True, unique=True)),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('email', models.CharField(blank=True, max_length=255, null=True)),
                ('batch', models.CharField(blank=True, max_length=45, null=True)),
                ('mobile_no', models.CharField(blank=True, max_length=45, null=True)),
                ('password', models.CharField(blank=True, max_length=45, null=True)),
                ('institute', models.CharField(blank=True, max_length=45, null=True)),
                ('status', models.CharField(blank=True, max_length=45, null=True)),
                ('detained', models.CharField(blank=True, max_length=45, null=True)),
                ('section', models.IntegerField(blank=True, null=True)),
                ('course', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Course')),
                ('department', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Department')),
                ('level', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Levels')),
                ('papers', models.ManyToManyField(to='welcome.Paper')),
                ('season', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Season')),
            ],
            options={
                'db_table': 'student',
            },
        ),
        migrations.CreateModel(
            name='Syllabus',
            fields=[
                ('syllabus_id', models.AutoField(primary_key=True, serialize=False)),
                ('nos_units', models.IntegerField(blank=True, null=True)),
                ('nos_chapters', models.IntegerField(blank=True, null=True)),
                ('paper', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Paper')),
            ],
            options={
                'db_table': 'syllabus',
            },
        ),
        migrations.CreateModel(
            name='SyllabusChapterDetail',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('chapter_no', models.IntegerField(blank=True, null=True)),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'syllabus_chapter_detail',
            },
        ),
        migrations.CreateModel(
            name='SyllabusSectionDetail',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('section_no', models.IntegerField(blank=True, null=True)),
                ('section_name', models.CharField(blank=True, max_length=45, null=True)),
                ('chapter', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='welcome.SyllabusChapterDetail')),
            ],
            options={
                'db_table': 'syllabus_section_detail',
            },
        ),
        migrations.CreateModel(
            name='SyllabusUnitDetail',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('unit_name', models.CharField(blank=True, max_length=255, null=True)),
                ('unit_no', models.IntegerField(blank=True, null=True)),
                ('syllabus', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='welcome.Syllabus')),
            ],
            options={
                'db_table': 'syllabus_unit_detail',
            },
        ),
        migrations.CreateModel(
            name='Testtable',
            fields=[
                ('auto_increment_id', models.AutoField(default=1, primary_key=True, serialize=False)),
                ('age', models.IntegerField(blank=True, null=True)),
                ('name', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'Testtable',
            },
        ),
        migrations.AddField(
            model_name='syllabuschapterdetail',
            name='unit',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='welcome.SyllabusUnitDetail'),
        ),
        migrations.AddField(
            model_name='seatingarrangement',
            name='room',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.SeatingRoom'),
        ),
        migrations.AddField(
            model_name='grade',
            name='level',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Levels'),
        ),
        migrations.AddField(
            model_name='examresult',
            name='grade',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Grade'),
        ),
        migrations.AddField(
            model_name='examresult',
            name='paper',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Paper'),
        ),
        migrations.AddField(
            model_name='examresult',
            name='student',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Student'),
        ),
        migrations.AddField(
            model_name='exam',
            name='paper',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Paper'),
        ),
        migrations.AddField(
            model_name='exam',
            name='season',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Season'),
        ),
        migrations.AddField(
            model_name='coursegrade',
            name='department',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Department'),
        ),
        migrations.AddField(
            model_name='coursegrade',
            name='level',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Levels'),
        ),
        migrations.AddField(
            model_name='classes',
            name='course',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Course'),
        ),
        migrations.AddField(
            model_name='classes',
            name='department',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Department'),
        ),
        migrations.AddField(
            model_name='classes',
            name='level',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Levels'),
        ),
        migrations.AddField(
            model_name='classes',
            name='season',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='welcome.Season'),
        ),
        migrations.AddField(
            model_name='classes',
            name='students',
            field=models.ManyToManyField(to='welcome.Student'),
        ),
    ]