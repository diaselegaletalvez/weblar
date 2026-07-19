const supabaseClient = window.supabase.createClient(
  'https://unsvccbzrrgnvzvdwwrz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuc3ZjY2J6cnJnbnZ6dmR3d3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0MzE0OTUsImV4cCI6MjEwMDAwNzQ5NX0.LI121gkIHkiplDTcolv6e6is6LxN0I1Ebmil5tJKRxY'
);

async function montarAreaAuth() {
  const area = document.getElementById('auth-area');
  if (!area) return;

  const { data: { session } } = await supabaseClient.auth.getSession();

  if (session) {
    const nome = session.user.user_metadata?.full_name?.split(' ')[0] || 'Conta';
    area.innerHTML = `
      <a href="painel.html" class="auth-link">${nome} ▾</a>
      <button id="btn-sair" class="auth-sair">Sair</button>
    `;
    document.getElementById('btn-sair').addEventListener('click', async () => {
      await supabaseClient.auth.signOut();
      window.location.href = 'index.html';
    });
  } else {
    area.innerHTML = `<a href="login.html" class="auth-cta">Entrar</a>`;
  }
}

montarAreaAuth();
