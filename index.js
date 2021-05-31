
const url = 'http://localhost:5502/data.json';  // port may vary - normally 5500 with live-server
const pie = document.getElementById('pie');
const keyList = document.querySelector('.key-list');
const col = () => ~~(Math.random() * 255) + 1;

    const configData = data => {   
        const shares = Object.values(data).map(el => +el.share);
        const newData = data.map((el, idx) => {
            return {
                id: +el.id,
                title: el.title,
                share: +el.share,
                color: `rgba(${col()}, ${col()}, ${col()}, 0.3)`,
                offSet: shares.map((_, i, arr2) => arr2.slice(0, i)
                    .reduce((acc, cur) => acc + cur, 0)
                )[idx]    
            }
        });
        const totalUsed = shares.reduce((acc, cur) => acc + cur, 0);
        if(totalUsed < 100) {
            const freeSpace = {
                id: data.length + 1,
                title: 'other',
                share: 100 - totalUsed,
                color: 'rgba(250, 250, 250, 1)',
                offSet: totalUsed
            };
            return [ ...newData, freeSpace ];
        }
        return newData;
    };


    const renderPie = newData => {
        // for the conical gradient
        const gradients = newData.map((el, i, arr) => {          
            return {
                color: el.color, 
                space: ' ',
                offSet: arr[i+1] ? arr[i+1].offSet : 0,
                perc: '%, ',
                colorNext: arr[i+1] ? arr[i+1].color : 0, 
                spcae: ' ',
                offSetCur: arr[i+1] ? arr[i+1].offSet : 0,
                perc2: '%,',                 
            }
                
        }).slice(0, -1);
        const gradString = gradients.map(el => Object.values(el)
            .join(''))
            .join(' ')
            .slice(0, -1);
        pie.style.background = `conic-gradient(${gradString})`
    }

    const renderKey = el => {
        const keyContent = `
            <li>
                <span class="icon" style="background-color: ${el.color}"> </span> 
                <span class="title"> ${el.title} </span>
                <span class="percent"> ${el.share}% </span> 
            </li>
        `;
        keyList.insertAdjacentHTML('beforeend', keyContent);
    };
    


(async function init(){
    try {
        const res = await fetch(url);
        const data = await res.json();  
        const newData = await configData(data);
        renderPie(newData);        
        newData.map(el => renderKey(el));
        
    } catch(err){
        console.error(err);
    }
})();