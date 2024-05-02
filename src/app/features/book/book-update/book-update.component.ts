import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CategoryService } from '../../services/category.service';
import { PublisherService } from '../../services/publisher.service';
import { Book } from '../../models/book';
import { ResponseModel } from '../../models/responseModel';
import { Category } from '../../models/Category';
import { Publisher } from '../../models/publisher';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from '../../pages/category-list/category-list.component';
import { GetAllBook } from '../../models/getAllBook';
import { Response } from '../../models/response';


@Component({
  selector: 'app-book-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CategoryListComponent,],
  templateUrl: './book-update.component.html',
  styleUrl: './book-update.component.css'
})
export class BookUpdateComponent implements OnInit {
  
  bookUpdateForm!: FormGroup;
  getBook: Book[] = [];
 
  categories: Category[] = [];
  publishers: Publisher[] = [];
  bookId!: any;
  
  
  
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private categoryService: CategoryService,
    private publisherService: PublisherService,
    private activeToute: ActivatedRoute) { }


  ngOnInit(): void {
    this.getAllCategories();
    this.getAllPublishers();

    this.getBookById();
    
    this.editBookAddForm();
    
  }
  editBookAddForm(){
    this.bookUpdateForm= this.formBuilder.group({
      id:[this.bookId],
      name:["",[Validators.required, Validators.minLength(2)]],
      isbn:["",Validators.required],
    })}

  
  getBoook(){
    this.bookId = this.activeToute.snapshot.paramMap.get('id');
    this.bookService.getById(this.bookId).subscribe((response:Response<Book>)=>{
      
      this.getBook=response.items.map((data:any)=>new Book(data));
      console.log(this.getBook)
    })
  }


  getBookById(){
    this.bookId = this.activeToute.snapshot.paramMap.get('id');
    
    
    this.bookService.getById(this.bookId).subscribe({
      next: (response:Response<Book>) => {
        this.getBook=response.items;
        console.log(this.getBook);
        console.log("Response:",response)
        
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
      }
    });
  }
  getAllCategories() {
    this.categoryService.getAll().subscribe(
      (response: ResponseModel<Category>) => {
        this.categories = response.items;
        console.log(this.categories);
      }
    );
  }

  getAllPublishers() {
    this.publisherService.getAllPublisher().subscribe((response: ResponseModel<Publisher>) => {
      this.publishers = response.items;
      console.log(this.publishers);
    });
  }
  onCategoryChange(event: any) {
    const selectedCategory = event.target.value;
    const category = this.categories.find(item => item.id == selectedCategory);
    console.log(category);
  }
  onPublisherChange(event: any) {
    const selectedPublisher = event.target.value;
    const publisher = this.publishers.find(item => item.id == selectedPublisher);
    console.log(publisher);
  }

  updateToDb(): void {
    if (this.bookUpdateForm.valid) {
      const formData: Book = this.bookUpdateForm.value;
      console.log(formData.name);
      this.bookService.editBook(formData).subscribe((response) => {
        console.log("response", response);
        alert(formData.name.toUpperCase() + " başarıyla güncellendi");
      }
      );
    }
  }
}
