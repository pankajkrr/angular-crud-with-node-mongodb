import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DocumentService } from './document.service';
import { Document } from './document';

@Component({
   selector: 'app-document',
   templateUrl: './document.component.html',
   styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit { 
   //Component properties
   allDocuments: Document[];
   statusCode: number;
   requestProcessing = false;
   documentIdToUpdate = null;
   processValidation = false;
   //Create form
   documentForm = new FormGroup({
       document_title: new FormControl('', Validators.required),
	   desc: new FormControl('', Validators.required),
	   publisher: new FormControl('', Validators.required)	   
   });
   //Create constructor to get service instance
   constructor(private documentService: DocumentService) {
   }
   //Create ngOnInit() and and load documents
   ngOnInit(): void {
	   this.getAllDocuments();
   }   
   
   //Fetch all documents
   	getAllDocuments() {
		this.documentService.getAllDocuments()
		  .subscribe(
                data => {
					this.allDocuments = data;
				},
				errorCode =>  this.statusCode = errorCode);  
	}

   //Handle create and update document
   onDocumentFormSubmit() {
	  this.processValidation = true;   
	  if (this.documentForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
      this.preProcessConfigurations();
	  let document = this.documentForm.value;
	  if (this.documentIdToUpdate === null) {  
	    //Generate v id then create document
        this.documentService.getAllDocuments()
	     .subscribe(documents => {
		   //Generate document id	 
		   let maxIndex = documents.length - 1;
		   let documentWithMaxIndex = documents[maxIndex];
		   let documentId = documentWithMaxIndex._id + 1;
		   document.id = documentId;
		   //Create document
     	   this.documentService.createDocument(document)
			  .subscribe(successCode => {
					this.statusCode = successCode;
					this.getAllDocuments();	
					this.backToCreateDocument();
				 },
				 errorCode => this.statusCode = errorCode
			   );
		 });		
	  } else {  
   	    //Handle update document
		   document.id = this.documentIdToUpdate; 		
	    this.documentService.updateDocument(document)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllDocuments();	
					this.backToCreateDocument();
			    },
		        errorCode => this.statusCode = errorCode);	  
	  }
   }
   //Load document by id to edit
   loadDocumentToEdit(documentId: string) {
      this.preProcessConfigurations();
      this.documentService.getDocumentById(documentId)
	      .subscribe(document => {
		            this.documentIdToUpdate = document._id;   
					this.documentForm.setValue({ document_title: document.document_title, publisher: document.publisher,  desc: document.desc });
					this.processValidation = true;
					this.requestProcessing = false;   
		        },
		        errorCode =>  this.statusCode = errorCode);   
   }
   //Delete document...
   deleteDocument(documentId: string) {
      this.preProcessConfigurations();
      this.documentService.deleteDocumentById(documentId)
	      .subscribe(successCode => {
		            //this.statusCode = successCode;
					//Expecting success code 204 from server
					this.statusCode = 204;
				    this.getAllDocuments();	
				    this.backToCreateDocument();
			    },
		        errorCode => this.statusCode = errorCode);    
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;   
   }
   //Go back from update to create
   backToCreateDocument() {
      this.documentIdToUpdate = null;
      this.documentForm.reset();	  
	  this.processValidation = false;
   }
}
    