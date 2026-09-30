import React from 'react';
import { BookOpen, Users, Clock, Award } from 'lucide-react';

export const CourseList = ({ courses, onSelectCourse }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {courses.map((course) => (
        <div
          key={course.id}
          className="glass-card p-5 glass-card-hover flex flex-col justify-between space-y-4"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="badge-primary">{course.code}</span>
              <span className="text-[11px] font-semibold text-slate-400">
                {course.credits} Credits
              </span>
            </div>
            <h4 className="text-base font-bold text-slate-900 mt-2 font-['Outfit']">
              {course.title}
            </h4>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{course.description}</p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-500" />
              <span>{course.enrolledStudents || 45} Students</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>{course.semester}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
