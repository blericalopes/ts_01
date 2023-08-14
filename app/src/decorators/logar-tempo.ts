export function logarTempo(emSegundos: boolean = false) { //valor padrão false para o parametro caso não queria passar
    return function(
        target: any, //função construtora do decorator
        propertyKey: string, 
        descriptor: PropertyDescriptor
    ) {

        const metodoOriginal = descriptor.value;
        descriptor.value = function(...args: any []) {
            let divisor = 1; 
            let unidade = 'milisegundos';
            if(emSegundos) {
                divisor = 1000;
                unidade = 'segundos';
            }
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`${propertyKey}, tempo de execução: ${(t2 - t1)/divisor} ${unidade}`)
            retorno
        }

        return descriptor;
    }
}