export function imgurl(url) {
    if (url) {
        let type = url.slice(-3) === 'png' ? 'png' : url.slice(-4) === 'jpeg' ? 'jpeg' : 'png';
        let param = url.substring(0, 1) + '/' + url.substring(1, 3) + '/' + url.substring(3);
        return `${param}.${type}`;
    }
}

export function pushNoRepeat() {
    Array.prototype.pushNoRepeat=function () {
        for(var i=0;i<arguments.length;i++){
            var ele=arguments[i];
            if(this.indexOf(ele)===-1){
                this.push(ele)
            }
        }
    }
}
//浮点数
export function formatFloat (f, digit=2) {
        var m = Math.pow(10, digit);
        return Math.round(f * m, 10) / m;
}
