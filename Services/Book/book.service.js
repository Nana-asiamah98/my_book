const express = require('express')

const router = express();

//Models
const Book = require('../../Models/Book/book.model');

//Services
const MongooseService = require('../../Services/Mongoose/mongoose.service');


class BookService{

    /** 
     * @description Create an instance of BookService
     */

    constructor(){
        this.MongooseService = new MongooseService(Book);
    }



    async createBook(bookData){
        try{
            const result = await this.MongooseService.create(bookData);
            return {
                success: true,
                body: result
            }
        }catch(err){
            return{
                error: false,
                body: err
            }
        }
    }

    async findBookByUserId(id){
        try {
            const result = await this.MongooseService.find({"user_id": id});
            return {
                success: true,
                body: result
            }
        } catch (error) {
            
        }
    }


    async findBook(book_id){
        try{
            const result = await this.MongooseService.findById(book_id);
            return {
                success: true,
                body: result
            };
        }catch(err){
            return{
                error: false,
                body: err
            };;
        }
    }

    async findBooks(){
        try{
            const result = await this.MongooseService.find();
            return {
                success: true,
                body: result
            };
        }catch(err){
            return{
                error: false,
                body: err
            };;
        }
    }
    async updateBook(book_id,bookData){
        try{
            const result = await this.MongooseService.update(book_id,bookData);
            return {
                success: true,
                body: result
            };
        }catch(err){
            return{
                error: false,
                body: err
            };;
        }
    }
    async deleteBook(book_id){
        try{
            const result = await this.MongooseService.delete(book_id);
            return {
                success: true,
                body: result
            };
        }catch(err){
            return{
                error: false,
                body: err
            };;
        }
    }


}

module.exports = BookService;
