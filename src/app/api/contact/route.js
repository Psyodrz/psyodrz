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
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
// Function to save messages to a local file
function saveMessageToFile(message) {
    return __awaiter(this, void 0, void 0, function () {
        var messagesDir, timestamp, filename, messageWithTimestamp;
        return __generator(this, function (_a) {
            try {
                messagesDir = path.join(process.cwd(), 'messages');
                if (!fs.existsSync(messagesDir)) {
                    fs.mkdirSync(messagesDir, { recursive: true });
                }
                timestamp = new Date().toISOString().replace(/:/g, '-');
                filename = "".concat(messagesDir, "/message-").concat(timestamp, ".json");
                messageWithTimestamp = __assign(__assign({}, message), { receivedAt: new Date().toISOString() });
                // Write to file
                fs.writeFileSync(filename, JSON.stringify(messageWithTimestamp, null, 2));
                console.log("Message saved to file: ".concat(filename));
                return [2 /*return*/, { success: true, filename: filename }];
            }
            catch (error) {
                console.error('Error saving message to file:', error);
                return [2 /*return*/, { success: false, error: error }];
            }
            return [2 /*return*/];
        });
    });
}
export function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var body, emailRegex, emailSent, fileStorage, transporter, mailOptions, emailError_1, saveResult, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('POST /api/contact - Request received');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 11, , 12]);
                    return [4 /*yield*/, request.json()];
                case 2:
                    body = _a.sent();
                    console.log('Request body:', JSON.stringify(body));
                    // Input validation
                    if (!body.name || !body.email || !body.subject || !body.message) {
                        console.log('Validation error: Missing required fields');
                        return [2 /*return*/, NextResponse.json({ error: 'All fields are required' }, { status: 400 })];
                    }
                    emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(body.email)) {
                        console.log('Validation error: Invalid email format');
                        return [2 /*return*/, NextResponse.json({ error: 'Invalid email format' }, { status: 400 })];
                    }
                    // For demonstration purposes, log the message details
                    console.log('Message details:');
                    console.log('- From:', body.name, '(' + body.email + ')');
                    console.log('- Subject:', body.subject);
                    console.log('- Message:', body.message);
                    emailSent = false;
                    fileStorage = false;
                    if (!(process.env.EMAIL_USER && process.env.EMAIL_PASS)) return [3 /*break*/, 7];
                    console.log('Email credentials found, attempting to send email...');
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
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
                        text: "\n            Name: ".concat(body.name, "\n            Email: ").concat(body.email, "\n            Subject: ").concat(body.subject, "\n            Message: ").concat(body.message, "\n          "),
                    };
                    console.log('Sending email to:', process.env.EMAIL_USER);
                    return [4 /*yield*/, transporter.sendMail(mailOptions)];
                case 4:
                    _a.sent();
                    console.log('Email sent successfully');
                    emailSent = true;
                    return [3 /*break*/, 6];
                case 5:
                    emailError_1 = _a.sent();
                    console.error('Failed to send email notification - detailed error:', emailError_1);
                    return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 8];
                case 7:
                    console.log('Email credentials not found in environment variables');
                    _a.label = 8;
                case 8:
                    if (!!emailSent) return [3 /*break*/, 10];
                    console.log('Using file storage fallback...');
                    return [4 /*yield*/, saveMessageToFile(body)];
                case 9:
                    saveResult = _a.sent();
                    fileStorage = saveResult.success;
                    if (!fileStorage) {
                        console.error('File storage also failed');
                        // Only return error if both email and file storage failed
                        if (!emailSent && !fileStorage) {
                            return [2 /*return*/, NextResponse.json({ error: 'Failed to process message: All storage methods failed' }, { status: 500 })];
                        }
                    }
                    _a.label = 10;
                case 10: 
                // Return appropriate success message
                return [2 /*return*/, NextResponse.json({
                        message: 'Message received successfully',
                        emailSent: emailSent,
                        fileStorage: fileStorage,
                        storageMethod: emailSent ? 'email' : 'file'
                    }, { status: 201 })];
                case 11:
                    error_1 = _a.sent();
                    console.error('Unhandled error in POST /api/contact:', error_1);
                    return [2 /*return*/, NextResponse.json({ error: 'Internal server error' }, { status: 500 })];
                case 12: return [2 /*return*/];
            }
        });
    });
}
