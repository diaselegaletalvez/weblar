const clienteSupabase = window.supabase.createClient(
  'https://unsvccbzrrgnvzvdwwrz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuc3ZjY2J6cnJnbnZ6dmR3d3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0MzE0OTUsImV4cCI6MjEwMDAwNzQ5NX0.LI121gkIHkiplDTcolv6e6is6LxN0I1Ebmil5tJKRxY'
);

async function montarAreaAuth() {
  const area = document.getElementById('auth-area');
  if (!area) return;
  const { data: { session } } = await clienteSupabase.auth.getSession();
  if (!session) {
    area.innerHTML = `<a href="/login/" class="auth-cta">Entrar</a>`;
    return;
  }
  const user = session.user;
  const { data: perfil } = await clienteSupabase.from('profiles').select('full_name, avatar_url').eq('id', user.id).single();
  const nomeCompleto = perfil?.full_name || user.user_metadata?.full_name || 'Conta';
  const primeiro = nomeCompleto.split(' ')[0];
  const avatarHtml = perfil?.avatar_url
    ? `<img src="${perfil.avatar_url}" style="width:100%;height:100%;object-fit:cover;">`
    : primeiro.charAt(0).toUpperCase();
  area.innerHTML = `
    <div class="auth-conta" id="auth-conta">
      <span class="auth-nome">${primeiro}</span>
      <div class="auth-avatar">${avatarHtml}</div>
      <div class="auth-menu" id="auth-menu">
        <a href="/painel/" class="auth-mitem">
          <svg viewBox="0 0 24 24" class="mic"><path d="M3 12l9-9 9 9"/><path d="M5 10v10h14V10"/></svg> Ir ao painel</a>
        <a href="/painel/#pedidos" class="auth-mitem">
          <svg viewBox="0 0 24 24" class="mic"><path d="M21 16V8a2 2 0 00-1-1.7l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.7l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg> Meus pedidos</a>
        <a href="/pedir-orcamento/" class="auth-mitem">
          <svg viewBox="0 0 24 24" class="mic"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/></svg> Pedir orçamento</a>
        <button class="auth-mitem sair" id="auth-sair">
          <svg viewBox="0 0 24 24" class="mic"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg> Sair</button>
      </div>
    </div>
  `;
  const conta = document.getElementById('auth-conta');
  const menu = document.getElementById('auth-menu');
  conta.addEventListener('click', (e) => {
    if (e.target.closest('#auth-sair')) return;
    menu.classList.toggle('aberto');
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#auth-conta')) menu.classList.remove('aberto');
  });
  document.getElementById('auth-sair').addEventListener('click', async () => {
    await clienteSupabase.auth.signOut();
    window.location.href = '/';
  });
}
montarAreaAuth();
