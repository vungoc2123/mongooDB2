
const express = require('express')
const app = express()
const port = 3000
const expressHbs = require('express-handlebars');

const mongoose = require('mongoose');
const uri = 'mongodb+srv://nvu806101:19ShRC4UNeVi69Dz@cluster0.iupvbq2.mongodb.net/Database?retryWrites=true&w=majority';
const SanPhamModel = require('./SanPhamModel');

app.engine('.hbs', expressHbs.engine({ defaultLayout: 'main', extname: "hbs", layoutsDir: './views/layouts' }));
app.set('view engine', '.hbs');
app.set('views', './views');



app.get('/', async (req, res) => {
    await mongoose.connect(uri);

    console.log('Ket noi DB thanh cong!');

    let arrSP = await SanPhamModel.find();

    console.log(arrSP);

    res.render('list',{products:arrSP})

})

app.get('/add_sp', async (req, res) => {
    await mongoose.connect(uri);

    console.log('Ket noi DB thanh cong!');

    let spMoi = {
        ten: 'Ao Khoac Nam',
        gia: 550,
        soluong: 120,
        giamgia: 10
    }

    let kq = await SanPhamModel.insertMany(spMoi);

    console.log(kq);

    let arrSP = await SanPhamModel.find();

    res.render('list',{products:arrSP})

})

app.get('/update_sp', async (req, res) => {
    await mongoose.connect(uri);
    console.log('Ket noi DB thanh cong!');
    let kq = await SanPhamModel.updateOne({ gia: 550 }, { $set: { ten: "Ao phong" } })
    console.log(kq);
    let arrSP = await SanPhamModel.find();
    res.render('list',{products:arrSP})
})

app.get('/delete_sp', async (req, res) => {
    await mongoose.connect(uri);
    console.log('Ket noi DB thanh cong!');
    let kq = await SanPhamModel.deleteMany({ ten: "Ao phong" })
    console.log(kq);
    let arrSP = await SanPhamModel.find();
    res.render('list',{products:arrSP})
})



app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
});

