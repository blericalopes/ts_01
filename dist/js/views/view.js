export class View {
    constructor(seletor, escapar) {
        this.escapar = false;
        this.element = document.querySelector(seletor);
    }
    update(model) {
        let template = this.template(model);
        if (this.escapar) {
            template = template.replace(/<script>[\s\S]*?<\/scrip>/, '');
        }
        this.element.innerHTML = template;
    }
}
