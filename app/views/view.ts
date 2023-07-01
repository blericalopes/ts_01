export abstract class View<T> {

    protected element: HTMLElement;
    private escapar = false

    constructor(seletor: string, escapar?: boolean) {
        this.element = document.querySelector(seletor)
    }


    public update(model: T): void {
        let template = this.template(model);
        if (this.escapar) {
            template = template.replace(/<script>[\s\S]*?<\/scrip>/, '');
        }
        this.element.innerHTML = template;
    }

    protected abstract template(model: T): string;
}