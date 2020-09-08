export function go_back(data){
    let validPages = ['dashboard','unauthorized','handover','signup'];
    validPages.map((page) => {
        if(window.location.hash && window.location.hash.includes(page)) {
            if (typeof window.Android !== 'undefined' && window.Android !== null) {
                window.Android.goHome();
            } 
        }
    })
    window.history.back();
}