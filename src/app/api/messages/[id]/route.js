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
import dbConnect from '@/lib/db';
import Message from '@/models/Message';
import fs from 'fs';
import path from 'path';
// Load fallback data from JSON file
function loadFallbackMessages() {
    try {
        var filePath = path.join(process.cwd(), 'src', 'data', 'messages.json');
        var fileData = fs.readFileSync(filePath, 'utf8');
        var messages = JSON.parse(fileData);
        return messages.map(function (message, index) {
            return __assign(__assign({}, message), { _id: "fallback-".concat(index + 1), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
        });
    }
    catch (error) {
        console.error('Error loading fallback messages:', error);
        return [];
    }
}
// Find a fallback message by ID
function findFallbackMessage(id) {
    var fallbackMessages = loadFallbackMessages();
    return fallbackMessages.find(function (message) { return message._id === id; });
}
// Find a file-based message by ID
function findFileMessage(id) {
    if (!id.startsWith('file-')) {
        return null;
    }
    var filenameBase = id.replace('file-', '').replace(/-/g, '-');
    try {
        var messagesDir = path.join(process.cwd(), 'messages');
        if (!fs.existsSync(messagesDir)) {
            return null;
        }
        var files = fs.readdirSync(messagesDir);
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            if (file.endsWith('.json')) {
                var fileId = "file-".concat(file.replace(/[^a-zA-Z0-9]/g, '-'));
                if (fileId === id) {
                    var filePath = path.join(messagesDir, file);
                    var content = fs.readFileSync(filePath, 'utf-8');
                    var data = JSON.parse(content);
                    return {
                        _id: fileId,
                        name: data.name,
                        email: data.email,
                        subject: data.subject || 'Message from Portfolio Contact Form',
                        message: data.message,
                        read: data.read || false,
                        createdAt: data.receivedAt || new Date().toISOString(),
                        updatedAt: data.receivedAt || new Date().toISOString(),
                        filePath: filePath
                    };
                }
            }
        }
        return null;
    }
    catch (error) {
        console.error('Error finding file message:', error);
        return null;
    }
}
// Update a file-based message
function updateFileMessage(filePath, updates) {
    try {
        var content = fs.readFileSync(filePath, 'utf-8');
        var data = JSON.parse(content);
        var updatedData = __assign(__assign({}, data), { read: updates.read });
        fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
        return {
            success: true,
            message: updatedData
        };
    }
    catch (error) {
        console.error('Error updating file message:', error);
        return {
            success: false,
            error: error
        };
    }
}
// Delete a file-based message
function deleteFileMessage(filePath) {
    try {
        fs.unlinkSync(filePath);
        return { success: true };
    }
    catch (error) {
        console.error('Error deleting file message:', error);
        return { success: false, error: error };
    }
}
export function PATCH(request_1, _a) {
    return __awaiter(this, arguments, void 0, function (request, _b) {
        var body, fallbackMessage, updatedMessage, fileMessage, result, message, dbError_1, error_1;
        var params = _b.params;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 7, , 8]);
                    if (!params.id) {
                        return [2 /*return*/, NextResponse.json({ error: 'Message ID is required' }, { status: 400 })];
                    }
                    return [4 /*yield*/, request.json()];
                case 1:
                    body = _c.sent();
                    if (!body || typeof body.read !== 'boolean') {
                        return [2 /*return*/, NextResponse.json({ error: 'Invalid request body' }, { status: 400 })];
                    }
                    if (params.id.startsWith('fallback-')) {
                        fallbackMessage = findFallbackMessage(params.id);
                        if (fallbackMessage) {
                            updatedMessage = __assign(__assign({}, fallbackMessage), { read: body.read, updatedAt: new Date().toISOString() });
                            return [2 /*return*/, NextResponse.json(updatedMessage)];
                        }
                        else {
                            return [2 /*return*/, NextResponse.json({ error: 'Fallback message not found' }, { status: 404 })];
                        }
                    }
                    if (params.id.startsWith('file-')) {
                        fileMessage = findFileMessage(params.id);
                        if (fileMessage) {
                            result = updateFileMessage(fileMessage.filePath, { read: body.read });
                            if (result.success) {
                                return [2 /*return*/, NextResponse.json(__assign(__assign({}, fileMessage), { read: body.read, updatedAt: new Date().toISOString() }))];
                            }
                            else {
                                return [2 /*return*/, NextResponse.json({ error: 'Failed to update file message' }, { status: 500 })];
                            }
                        }
                        else {
                            return [2 /*return*/, NextResponse.json({ error: 'File message not found' }, { status: 404 })];
                        }
                    }
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, dbConnect()];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, Message.findByIdAndUpdate(params.id, { $set: body }, { new: true })];
                case 4:
                    message = _c.sent();
                    if (!message) {
                        return [2 /*return*/, NextResponse.json({ error: 'Message not found' }, { status: 404 })];
                    }
                    return [2 /*return*/, NextResponse.json(message)];
                case 5:
                    dbError_1 = _c.sent();
                    console.error('Database error in PATCH:', dbError_1);
                    if (params.id.length > 10) {
                        return [2 /*return*/, NextResponse.json({ error: 'Database connection error' }, { status: 500 })];
                    }
                    return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_1 = _c.sent();
                    console.error('Error in PATCH /api/messages/[id]:', error_1);
                    return [2 /*return*/, NextResponse.json({ error: 'Internal server error' }, { status: 500 })];
                case 8: return [2 /*return*/];
            }
        });
    });
}
export function DELETE(request_1, _a) {
    return __awaiter(this, arguments, void 0, function (request, _b) {
        var fileMessage, result, message, dbError_2, error_2;
        var params = _b.params;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 6, , 7]);
                    if (!params.id) {
                        return [2 /*return*/, NextResponse.json({ error: 'Message ID is required' }, { status: 400 })];
                    }
                    if (params.id.startsWith('fallback-')) {
                        return [2 /*return*/, NextResponse.json({ message: 'Message deleted successfully' }, { status: 200 })];
                    }
                    if (params.id.startsWith('file-')) {
                        fileMessage = findFileMessage(params.id);
                        if (fileMessage) {
                            result = deleteFileMessage(fileMessage.filePath);
                            if (result.success) {
                                return [2 /*return*/, NextResponse.json({ message: 'Message deleted successfully' }, { status: 200 })];
                            }
                            else {
                                return [2 /*return*/, NextResponse.json({ error: 'Failed to delete file message' }, { status: 500 })];
                            }
                        }
                        else {
                            return [2 /*return*/, NextResponse.json({ error: 'File message not found' }, { status: 404 })];
                        }
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, dbConnect()];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, Message.findByIdAndDelete(params.id)];
                case 3:
                    message = _c.sent();
                    if (!message) {
                        return [2 /*return*/, NextResponse.json({ error: 'Message not found' }, { status: 404 })];
                    }
                    return [2 /*return*/, NextResponse.json({ message: 'Message deleted successfully' }, { status: 200 })];
                case 4:
                    dbError_2 = _c.sent();
                    console.error('Database error in DELETE:', dbError_2);
                    return [2 /*return*/, NextResponse.json({ message: 'Request processed but database is unavailable' }, { status: 200 })];
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_2 = _c.sent();
                    console.error('Error in DELETE /api/messages/[id]:', error_2);
                    return [2 /*return*/, NextResponse.json({ error: 'Internal server error' }, { status: 500 })];
                case 7: return [2 /*return*/];
            }
        });
    });
}
