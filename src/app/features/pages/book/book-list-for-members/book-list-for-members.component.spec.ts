import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListForMembersComponent } from './book-list-for-members.component';

describe('BookListForMembersComponent', () => {
  let component: BookListForMembersComponent;
  let fixture: ComponentFixture<BookListForMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookListForMembersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookListForMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
