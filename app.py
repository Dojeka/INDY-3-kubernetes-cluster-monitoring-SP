from playwright.sync_api import sync_playwright

def test_access_local_storage():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://example.com")

        # Access localStorage data
        local_storage_data = page.evaluate("""
            () => {
                let data = {};
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    data[key] = localStorage.getItem(key);
                }
                return data;
            }
        """)
        print("Local Storage Data:", local_storage_data)
        browser.close()   