# Generated by Django 4.1.13 on 2024-02-11 08:13

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('furnApp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=200, unique=True)),
            ],
        ),
        migrations.AddField(
            model_name='register_details',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
