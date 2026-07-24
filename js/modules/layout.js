export function renderLayout(content){

    return `

    <div class="layout">

        <aside class="sidebar">

            <h2>GelaKlik</h2>

            <br>

            <div class="menu">

                <button>🏠 Hasiera</button>

                <button>👥 Taldeak</button>

                <button>📋 Irizpideak</button>

                <button>📝 Erregistroak</button>

                <button>📊 Emaitzak</button>

                <button>⚙️ Ezarpenak</button>

            </div>

        </aside>

        <section class="content">

            ${content}

        </section>

    </div>

    `;

}