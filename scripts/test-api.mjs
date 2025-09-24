import fetch from 'node-fetch';

const base = 'http://localhost:3000';

async function run() {
  try {
    console.log('1) Criar usuário');
    let res = await fetch(`${base}/usuarios`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: 'Teste', email: `teste${Date.now()}@ex.com`, password: '123456' }) });
    const user = await res.json();
    console.log('  ->', res.status, user.id ? `id=${user.id}` : user);

    console.log('2) Criar loja vinculada ao usuário');
    res = await fetch(`${base}/stores`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: 'Loja Teste', userId: user.id }) });
    const store = await res.json();
    console.log('  ->', res.status, store.id ? `id=${store.id}` : store);

    console.log('3) Criar produto vinculado à loja');
    res = await fetch(`${base}/products`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: 'Produto Teste', price: 9.9, storeId: store.id }) });
    const product = await res.json();
    console.log('  ->', res.status, product.id ? `id=${product.id}` : product);

    console.log('4) Ler loja com include');
    res = await fetch(`${base}/stores/${store.id}`);
    const storeWith = await res.json();
    console.log('  ->', res.status, `products=${(storeWith.products||[]).length}`, `userId=${storeWith.userId}`);

    console.log('5) Ler produtos com include');
    res = await fetch(`${base}/products`);
    const productsList = await res.json();
    console.log('  ->', res.status, `total=${productsList.length}`);

    console.log('6) Atualizar produto');
    res = await fetch(`${base}/products/${product.id}`, { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: 'Produto Teste Atualizado', price: 19.9 }) });
    const updated = await res.json();
    console.log('  ->', res.status, updated.id ? `name=${updated.name}` : updated);

    console.log('7) Deletar produto');
    res = await fetch(`${base}/products/${product.id}`, { method: 'DELETE' });
    console.log('  ->', res.status);

    console.log('8) Deletar loja');
    res = await fetch(`${base}/stores/${store.id}`, { method: 'DELETE' });
    console.log('  ->', res.status);

    console.log('Teste concluído');
  } catch (e) {
    console.error('Erro no teste:', e.message || e);
    process.exit(1);
  }
}

run();
