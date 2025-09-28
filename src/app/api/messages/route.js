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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Message from '@/models/Message';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
// Load fallback data from JSON file
function loadFallbackMessages() {
    try {
        var filePath = path.join(process.cwd(), 'src', 'data', 'messages.json');
        var fileData = fs.readFileSync(filePath, 'utf8');
        var messages = JSON.parse(fileData);
        return messages.map(function (message, index) {
            var now = new Date();
            var daysAgo = Math.floor(Math.random() * 7);
            var date = new Date(now);
            date.setDate(date.getDate() - daysAgo);
            return __assign(__assign({}, message), { _id: "fallback-".concat(index + 1), createdAt: date.toISOString(), updatedAt: date.toISOString() });
        });
    }
    catch (error) {
        console.error('Error loading fallback messages:', error);
        return [];
    }
}
// Function to load messages from files
function loadFileMessages() {
    try {
        var messagesDir_1 = path.join(process.cwd(), 'messages');
        if (!fs.existsSync(messagesDir_1)) {
            return [];
        }
        var files = fs.readdirSync(messagesDir_1);
        var messages = files
            .filter(function (file) { return file.endsWith('.json'); })
            .map(function (file) {
            try {
                var filePath = path.join(messagesDir_1, file);
                var content = fs.readFileSync(filePath, 'utf-8');
                var data = JSON.parse(content);
                var message = {
                    _id: "file-".concat(file.replace(/[^a-zA-Z0-9]/g, '-')),
                    name: data.name,
                    email: data.email,
                    subject: data.subject || 'Message from Portfolio Contact Form',
                    message: data.message,
                    read: false,
                    createdAt: data.receivedAt || new Date().toISOString(),
                    updatedAt: data.receivedAt || new Date().toISOString()
                };
                return message;
            }
            catch (err) {
                console.error("Error reading file ".concat(file, ":"), err);
                return null;
            }
        })
            .filter(function (msg) { return msg !== null; });
        return messages;
    }
    catch (error) {
        console.error('Error loading file messages:', error);
        return [];
    }
}
export function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var body, emailRegex, messageId, message, dbError_1, transporter, mailOptions, emailError_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('POST /api/messages - Request received');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 14, , 15]);
                    return [4 /*yield*/, request.json()];
                case 2:
                    body = _a.sent();
                    console.log('Request body:', JSON.stringify(body));
                    if (!body.name || !body.email || !body.subject || !body.message) {
                        console.log('Validation error: Missing required fields');
                        return [2 /*return*/, NextResponse.json({ error: 'All fields are required' }, { status: 400 })];
                    }
                    emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(body.email)) {
                        console.log('Validation error: Invalid email format');
                        return [2 /*return*/, NextResponse.json({ error: 'Invalid email format' }, { status: 400 })];
                    }
                    messageId = null;
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 6, , 7]);
                    console.log('Attempting to connect to MongoDB...');
                    return [4 /*yield*/, dbConnect()];
                case 4:
                    _a.sent();
                    console.log('Connected to MongoDB successfully');
                    return [4 /*yield*/, Message.create(body)];
                case 5:
                    message = _a.sent();
                    messageId = message._id;
                    console.log('Message saved to database with ID:', messageId);
                    return [3 /*break*/, 7];
                case 6:
                    dbError_1 = _a.sent();
                    console.error('Database error details:', dbError_1);
                    return [3 /*break*/, 7];
                case 7:
                    if (!(process.env.EMAIL_USER && process.env.EMAIL_PASS)) return [3 /*break*/, 12];
                    console.log('Email credentials found, attempting to send email...');
                    _a.label = 8;
                case 8:
                    _a.trys.push([8, 10, , 11]);
                    transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: process.env.EMAIL_USER,
                            pass: process.env.EMAIL_PASS,
                        },
                    });
                    console.log('Email transporter created');
                    mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: process.env.EMAIL_USER,
                        subject: "New Message from ".concat(body.name, ": ").concat(body.subject),
                        text: "\n            Name: ".concat(body.name, "\n            Email: ").concat(body.email, "\n            Subject: ").concat(body.subject, "\n            Message: ").concat(body.message, "\n            ").concat(messageId ? "Message ID: ".concat(messageId) : '', "\n          "),
                    };
                    console.log('Sending email to:', process.env.EMAIL_USER);
                    return [4 /*yield*/, transporter.sendMail(mailOptions)];
                case 9:
                    _a.sent();
                    console.log('Email sent successfully');
                    return [3 /*break*/, 11];
                case 10:
                    emailError_1 = _a.sent();
                    console.error('Failed to send email notification - detailed error:', emailError_1);
                    if (!messageId) {
                        return [2 /*return*/, NextResponse.json({ error: 'Failed to save message and send notification' }, { status: 500 })];
                    }
                    return [3 /*break*/, 11];
                case 11: return [3 /*break*/, 13];
                case 12:
                    console.log('Email credentials not found in environment variables');
                    _a.label = 13;
                case 13:
                    console.log('Request completed successfully');
                    return [2 /*return*/, NextResponse.json({ message: 'Message sent successfully', id: messageId }, { status: 201 })];
                case 14:
                    error_1 = _a.sent();
                    console.error('Unhandled error in POST /api/messages:', error_1);
                    return [2 /*return*/, NextResponse.json({ error: 'Internal server error' }, { status: 500 })];
                case 15: return [2 /*return*/];
            }
        });
    });
}
export function GET() {
    return __awaiter(this, void 0, void 0, function () {
        var dbMessages, fileMessages, dbError_2, allMessages, error_2, fallbackMessages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('GET /api/messages - Request received');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    dbMessages = [];
                    fileMessages = [];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    console.log('Attempting to connect to MongoDB...');
                    return [4 /*yield*/, dbConnect()];
                case 3:
                    _a.sent();
                    console.log('Connected to MongoDB successfully');
                    return [4 /*yield*/, Message.find().sort({ createdAt: -1 })];
                case 4:
                    dbMessages = _a.sent();
                    console.log("Found ".concat(dbMessages.length, " messages in database"));
                    return [3 /*break*/, 6];
                case 5:
                    dbError_2 = _a.sent();
                    console.error('Database connection error:', dbError_2);
                    return [3 /*break*/, 6];
                case 6:
                    fileMessages = loadFileMessages();
                    console.log("Found ".concat(fileMessages.length, " messages in files"));
                    allMessages = __spreadArray(__spreadArray([], dbMessages, true), fileMessages, true);
                    allMessages.sort(function (a, b) {
                        var dateA = new Date(a.createdAt).getTime();
                        var dateB = new Date(b.createdAt).getTime();
                        return dateB - dateA;
                    });
                    if (allMessages.length === 0) {
                        console.log('No messages found in database or files, using fallback data');
                        allMessages = loadFallbackMessages();
                        console.log("Loaded ".concat(allMessages.length, " fallback messages"));
                    }
                    return [2 /*return*/, NextResponse.json(allMessages || [])];
                case 7:
                    error_2 = _a.sent();
                    console.error('Unhandled error in GET /api/messages:', error_2);
                    try {
                        fallbackMessages = loadFallbackMessages();
                        return [2 /*return*/, NextResponse.json(fallbackMessages)];
                    }
                    catch (fallbackError) {
                        return [2 /*return*/, NextResponse.json([])];
                    }
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
