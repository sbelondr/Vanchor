export class Article {
	public	id: string;
	public	title: string;
	public	description: string;
	public	contenu: string;
	public	publishedOn: Date;
	public	status: number;
	public	allowComments: boolean;

	constructor(id: string, title: string, description: string, contenu: string, publishedOn: Date, status: number, allowComments: boolean) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.contenu = contenu;
		this.publishedOn = publishedOn;
		this.status = status;
		this.allowComments = allowComments;
	}
}