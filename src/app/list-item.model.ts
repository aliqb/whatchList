export class ListItem{
    public poster:string;
    public title:string;
    public year:string;
    public id:string;
    public desc:string;
    public watched:boolean
    constructor(poster:string,title:string,year:string,id:string,watched:boolean=false,desc:string=''){
        this.poster=poster;
        this.title=title;
        this.year=year;
        this.id=id;
        this.watched=watched;
        this.desc=desc;
    }
}