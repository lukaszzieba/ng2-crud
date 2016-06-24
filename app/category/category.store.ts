
import {Injectable} from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import {CategoryService, Category} from "./category.service";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/Rx";

@Injectable()
export class CategoryStore {
    private _categories: BehaviorSubject<Category[]> = new BehaviorSubject(<Category[]>[]);

    get categories() {
        return this._categories.asObservable();
    }

    constructor(private _categoryService: CategoryService,
        private _activatedRoute: ActivatedRoute) {

        this.load();
    }

    load() {
        let id: number;
        this._activatedRoute.params.subscribe(params => {
            id = +params['id'];
            if (id) {
                this._categoryService.getCategoryByParentId(id)
                    .subscribe(res => {
                        let categories = <Category[]>res.json().data;
                        this._categories.next(categories);
                    },
                    err => console.log("Error retrieving categories")
                    );

            } else {
                this._categoryService.getRootCategory()
                    .subscribe(res => {
                        let categories = <Category[]>res.json().data;
                        this._categories.next(categories);
                    },
                    err => console.log("Error retrieving categories")
                    );
            }
        });
    }
}



// import {Injectable} from "angular2/core";
// import {TodoBackendService} from "../TodoBackendService";
// import {Observable} from "rxjs/Observable";
// import {Subject} from "rxjs/Subject";
// import {Todo} from "../Todo";
// import {List} from 'immutable';
// import {asObservable} from "./asObservable";
// import {BehaviorSubject} from "rxjs/Rx";

// @Injectable()
// export class TodoStore {

//     private _todos: BehaviorSubject<List<Todo>> = new BehaviorSubject(List([]));

//     constructor(private todoBackendService: TodoBackendService) {
//         this.loadInitialData();
//     }

//     get todos() {
//         return asObservable(this._todos);
//     }

//     loadInitialData() {
//         this.todoBackendService.getAllTodos()
//             .subscribe(
//                 res => {
//                     let todos = (<Object[]>res.json()).map((todo: any) =>
//                         new Todo({id:todo.id, description:todo.description,completed: todo.completed}));

//                     this._todos.next(List(todos));
//                 },
//                 err => console.log("Error retrieving Todos")
//             );

//     }

//     addTodo(newTodo:Todo):Observable {

//         let obs = this.todoBackendService.saveTodo(newTodo);

//         obs.subscribe(
//                 res => {
//                     this._todos.next(this._todos.getValue().push(newTodo));
//                 });

//         return obs;
//     }

//     toggleTodo(toggled:Todo): Observable {
//         let obs: Observable = this.todoBackendService.toggleTodo(toggled);

//         obs.subscribe(
//             res => {
//                 let todos = this._todos.getValue();
//                 let index = todos.findIndex((todo: Todo) => todo.id === toggled.id);
//                 let todo:Todo = todos.get(index);
//                 this._todos.next(todos.set(index, new Todo({id:toggled.id, description:toggled.description, completed:!toggled.completed}) ));
//             }
//         );

//         return obs;
//     }


//     deleteTodo(deleted:Todo): Observable {
//         let obs: Observable = this.todoBackendService.deleteTodo(deleted);

//         obs.subscribe(
//                 res => {
//                     let todos: List<Todo> = this._todos.getValue();
//                     let index = todos.findIndex((todo) => todo.id === deleted.id);
//                     this._todos.next(todos.delete(index));

//                 }
//             );

//         return obs;
//     }


// }