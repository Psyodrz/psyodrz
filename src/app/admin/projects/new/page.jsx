'use client';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiCheck, FiX } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
var INITIAL_FORM_STATE = {
    title: '',
    description: '',
    color: 'from-blue-500 to-purple-600',
    tags: '',
    github: '',
    demo: '',
    featured: false,
    order: 0,
};
var COLOR_OPTIONS = [
    { value: 'from-blue-500 to-purple-600', label: 'Blue to Purple' },
    { value: 'from-green-500 to-teal-600', label: 'Green to Teal' },
    { value: 'from-red-500 to-orange-600', label: 'Red to Orange' },
    { value: 'from-purple-500 to-pink-600', label: 'Purple to Pink' },
    { value: 'from-blue-400 to-indigo-600', label: 'Blue to Indigo' },
    { value: 'from-yellow-400 to-orange-500', label: 'Yellow to Orange' },
    { value: 'from-cyan-500 to-blue-500', label: 'Cyan to Blue' },
];
export default function NewProjectPage() {
    var _this = this;
    var router = useRouter();
    var _a = useState(INITIAL_FORM_STATE), formData = _a[0], setFormData = _a[1];
    var _b = useState(false), isSubmitting = _b[0], setIsSubmitting = _b[1];
    var _c = useState({}), errors = _c[0], setErrors = _c[1];
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
        // Clear error when field is edited
        if (errors[name]) {
            setErrors(function (prev) {
                var newErrors = __assign({}, prev);
                delete newErrors[name];
                return newErrors;
            });
        }
    };
    var handleCheckboxChange = function (e) {
        var _a = e.target, name = _a.name, checked = _a.checked;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = checked, _a)));
        });
    };
    var validateForm = function () {
        var newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }
        if (!formData.github.trim()) {
            newErrors.github = 'GitHub URL is required';
        }
        else if (!isValidUrl(formData.github)) {
            newErrors.github = 'Please enter a valid URL';
        }
        if (!formData.demo.trim()) {
            newErrors.demo = 'Demo URL is required';
        }
        else if (!isValidUrl(formData.demo)) {
            newErrors.demo = 'Please enter a valid URL';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    var isValidUrl = function (url) {
        try {
            new URL(url);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var tagsArray, projectData, response, errorData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!validateForm()) {
                        toast.error('Please fix the errors in the form');
                        return [2 /*return*/];
                    }
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    tagsArray = formData.tags
                        .split(',')
                        .map(function (tag) { return tag.trim(); })
                        .filter(function (tag) { return tag.length > 0; });
                    projectData = __assign(__assign({}, formData), { tags: tagsArray, order: parseInt(formData.order.toString()) });
                    return [4 /*yield*/, fetch('/api/projects', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(projectData),
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    errorData = _a.sent();
                    throw new Error(errorData.error || 'Failed to create project');
                case 4:
                    toast.success('Project created successfully');
                    router.push('/admin/projects');
                    return [3 /*break*/, 7];
                case 5:
                    error_1 = _a.sent();
                    console.error('Error creating project:', error_1);
                    toast.error(error_1 instanceof Error ? error_1.message : 'Failed to create project');
                    return [3 /*break*/, 7];
                case 6:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="min-h-screen p-6 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin/projects" className="inline-flex items-center text-primary hover:text-blue-600 mb-6">
          <FiArrowLeft className="mr-1"/> Back to Projects
        </Link>
        
        <h1 className="text-3xl font-bold font-heading tracking-wider mb-8">Add New Project</h1>
        
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className={"block w-full rounded-md shadow-sm ".concat(errors.title
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500', " dark:bg-gray-700 dark:text-white sm:text-sm")}/>
                {errors.title && (<p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>)}
              </div>
              
              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea id="description" name="description" rows={4} value={formData.description} onChange={handleChange} className={"block w-full rounded-md shadow-sm ".concat(errors.description
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500', " dark:bg-gray-700 dark:text-white sm:text-sm")}/>
                {errors.description && (<p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>)}
              </div>
              
              {/* Color */}
              <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Color Gradient
                </label>
                <div className="mt-1 flex space-x-2">
                  <select id="color" name="color" value={formData.color} onChange={handleChange} className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm">
                    {COLOR_OPTIONS.map(function (option) { return (<option key={option.value} value={option.value}>
                        {option.label}
                      </option>); })}
                  </select>
                  
                  <div className={"h-10 w-20 bg-gradient-to-br ".concat(formData.color, " rounded-md")}></div>
                </div>
              </div>
              
              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tags (comma separated)
                </label>
                <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} placeholder="React, TypeScript, Tailwind CSS" className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"/>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Enter tags separated by commas (e.g. React, TypeScript, UI/UX)
                </p>
              </div>
              
              {/* GitHub URL */}
              <div>
                <label htmlFor="github" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  GitHub URL <span className="text-red-500">*</span>
                </label>
                <input type="url" id="github" name="github" value={formData.github} onChange={handleChange} placeholder="https://github.com/username/project" className={"block w-full rounded-md shadow-sm ".concat(errors.github
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500', " dark:bg-gray-700 dark:text-white sm:text-sm")}/>
                {errors.github && (<p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.github}</p>)}
              </div>
              
              {/* Demo URL */}
              <div>
                <label htmlFor="demo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Demo URL <span className="text-red-500">*</span>
                </label>
                <input type="url" id="demo" name="demo" value={formData.demo} onChange={handleChange} placeholder="https://your-project-demo.com" className={"block w-full rounded-md shadow-sm ".concat(errors.demo
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500', " dark:bg-gray-700 dark:text-white sm:text-sm")}/>
                {errors.demo && (<p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.demo}</p>)}
              </div>
              
              {/* Featured & Order */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center">
                    <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleCheckboxChange} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Featured Project
                    </label>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Featured projects will be highlighted on your portfolio
                  </p>
                </div>
                
                <div>
                  <label htmlFor="order" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Display Order
                  </label>
                  <input type="number" id="order" name="order" value={formData.order} onChange={handleChange} min="0" className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"/>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Lower numbers will be displayed first
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-3">
              <Link href="/admin/projects" className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <FiX className="mr-2 -ml-1 h-5 w-5"/>
                Cancel
              </Link>
              <button type="submit" disabled={isSubmitting} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                <FiCheck className="mr-2 -ml-1 h-5 w-5"/>
                {isSubmitting ? 'Saving...' : 'Save Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>);
}
