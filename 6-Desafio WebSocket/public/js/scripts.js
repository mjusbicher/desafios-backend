class Usuario{
  constructor(email,nombre){
      this.email=email;
      this.nombre=nombre;        
  };
};

let userSesssion;
if( sessionStorage.getItem('UsuarioschatForm')){     
    userSesssion = JSON.parse(sessionStorage.getItem('UsuarioschatForm'));
}else{
    userSesssion = []
    sessionStorage.setItem('UsuarioschatForm',JSON.stringify(userSesssion));
};

const socket = io();

$(function () {
  socket.on('socketConnected', () => {
    socket.emit('productListRequest')
    socket.emit('chatMessagesRequest')
  });

  
  const productForm = $('#productForm');
  const productViewContainer = $('#productViewContainer');

  productForm.submit((event) => {
    event.preventDefault();

    const newProduct = {
      title: productForm[0][0].value,
      price: productForm[0][1].value,
      thumbnail: productForm[0][2].value,
    };

    socket.emit('addNewProduct', newProduct);
    productForm.trigger('reset');
  });

  socket.on('updateProductList', productListHandler);

  async function productListHandler(allProducts) {
    const productLayout = await fetch('layouts/productView.hbs');
    const layoutText = await productLayout.text();
    const compiledHbsTemplate = Handlebars.compile(layoutText);
    const html = compiledHbsTemplate({ allProducts });
    productViewContainer.empty().append(html);
  };

  
  const chatForm = $('#chatForm');
  const chatContainer = $('#chatContainer');

  chatForm.submit((event) => {
    event.preventDefault();

    const newMessage = {
      email: chatForm[0][0].value,
      messageText: chatForm[0][1].value,
    };

    if(userSesssion){
      sessionStorage.setItem('UsuarioschatForm',JSON.stringify(new Usuario(newMessage.email)))
      userSesssion = JSON.parse( sessionStorage.getItem('UsuarioschatForm') )
    };
    socket.emit('addNewMessage', newMessage)
    chatForm.trigger('reset')
  });

  socket.on('updateChatRoom', chatRoomHandler);

  async function chatRoomHandler(allMessages) {
    const chatLayout = await fetch('layouts/chatRoom.hbs');
    const layoutText = await chatLayout.text();
    const compiledHbsTemplate = Handlebars.compile(layoutText);
    const html = compiledHbsTemplate({ allMessages });
    chatContainer.empty().append(html);


    if(userSesssion==''){     
      chatForm[0][0].disabled = false;
    } else {
      userSesssion = JSON.parse(sessionStorage.getItem('UsuarioschatForm'));
      chatForm[0][0].value = userSesssion.email;
      chatForm[0][0].disabled = true;
    };
  };
});
