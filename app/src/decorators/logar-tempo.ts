export function logarTempo() {
    return function(
        target: any, //função construtora do decorator
        propertyKey: string, 
        descriptor: PropertyDescriptor
    ) {
        return descriptor;
    }
}