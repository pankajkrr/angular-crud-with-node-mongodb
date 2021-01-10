import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Document } from './document';

@Injectable()
export class DocumentService {
    //URL for CRUD operations
	documentUrl = "http://localhost:3000/document";
	//Create constructor to get Http instance
	constructor(private http:Http) { 
	}
	
	//Fetch all documents

	
    getAllDocuments(): Observable<Document[]> {
        return this.http.get(this.documentUrl+"/get-document")
		   		.map(this.extractData)
		        .catch(this.handleError);
	}
	
	//Create document
    createDocument(document: Document):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.documentUrl+"/create-document", document, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
	//Fetch document by id
    getDocumentById(documentId: string): Observable<Document> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: cpHeaders });
		return this.http.get(this.documentUrl +"/get-document-by-id?id="+ documentId)
			   .map(this.extractData)
			   .catch(this.handleError);
    }	
	//Update document
    updateDocument(document: Document):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.documentUrl +"/update-document", document, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Delete document	
    deleteDocumentById(documentId: string): Observable<number> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: cpHeaders });
		return this.http.delete(this.documentUrl +"/delete-document?id="+ documentId)
			   .map(success => success.status)
			   .catch(this.handleError);
    }	
	private extractData(res: Response) {
		let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
    }
}