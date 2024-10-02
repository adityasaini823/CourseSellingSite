const express=require("express");

const mongoose=require ("mongoose");

const connectDB = require('../config/db');

connectDB();
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner',
    },
    duration: {
        type: String,
    },
    numberOfLectures: {
        type: Number,
    },
    thumbnail: {
        type: String,
    },
    content: [
        {
            title: { type: String, required: true },
            videoUrl: { type: String, required: true },
            length: { type: String }
        }
    ],
    rating: {
        type: Number,
        default: 0,
    },
    numberOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            rating: { type: Number, required: true },
            comment: { type: String },
        }
    ],
    enrollmentCount: {
        type: Number,
        default: 0,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    lastUpdated: {
        type: Date,
    },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

