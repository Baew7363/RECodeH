(function() {
  let currentFileName = 'main.py';
  let currentMode = 'python';
  let isDark = true;
  let outputOpen = true;

  const extToMode = {
    'py': 'python', 'js': 'javascript', 'ts': 'text/typescript', 'jsx': 'javascript',
    'java': 'text/x-java', 'c': 'text/x-csrc', 'cpp': 'text/x-c++src', 'h': 'text/x-csrc',
    'cs': 'text/x-csharp', 'go': 'text/x-go', 'rs': 'text/x-rustsrc',
    'php': 'application/x-httpd-php', 'rb': 'ruby', 'swift': 'text/x-swift',
    'kt': 'text/x-kotlin', 'html': 'xml', 'htm': 'xml', 'css': 'css',
    'scss': 'text/x-sass', 'sass': 'text/x-sass', 'less': 'text/x-less', 'json': 'javascript',
    'xml': 'xml', 'yaml': 'yaml', 'yml': 'yaml', 'md': 'markdown',
    'sql': 'text/x-sql', 'sh': 'shell', 'bash': 'shell', 'zsh': 'shell',
    'ps1': 'application/x-powershell', 'dockerfile': 'dockerfile', 'lua': 'lua',
    'pl': 'perl', 'r': 'r', 'dart': 'dart', 'scala': 'text/x-scala',
    'groovy': 'groovy', 'm': 'text/x-objectivec', 'vb': 'text/x-vb',
    'fs': 'text/x-fsharp', 'ex': 'elixir', 'erl': 'erlang',
    'hs': 'haskell', 'clj': 'clojure', 'jl': 'julia',
    'coffee': 'coffeescript', 'graphql': 'graphql', 'sol': 'text/x-solidity',
    'vim': 'vim', 'tex': 'stex', 'matlab': 'octave', 'proto': 'protobuf',
    'toml': 'toml', 'ini': 'properties', 'bat': 'text/x-batch',
    'mk': 'cmake', 'cmake': 'cmake', 'v': 'verilog', 'vhd': 'vhdl',
    'asm': 'gas', 'pas': 'pascal', 'f90': 'fortran', 'cob': 'cobol',
    'lisp': 'commonlisp', 'scm': 'scheme', 'tcl': 'tcl', 'abap': 'abap',
    'cls': 'text/x-apex', 'cr': 'crystal', 'nim': 'nim', 'ml': 'text/x-ocaml',
    're': 'reason', 'purs': 'purescript', 'elm': 'elm', 'zig': 'zig',
    'wren': 'wren', 'glsl': 'glsl', 'hlsl': 'hlsl', 'wgsl': 'wgsl',
    'svelte': 'svelte', 'vue': 'vue', 'tsx': 'text/typescript-jsx',
    'txt': 'text/plain'
  };

  const modeToExt = {
    'python': 'py', 'javascript': 'js', 'text/typescript': 'ts', 'text/jsx': 'jsx',
    'text/x-java': 'java', 'text/x-csrc': 'c', 'text/x-c++src': 'cpp',
    'text/x-csharp': 'cs', 'text/x-go': 'go', 'text/x-rustsrc': 'rs',
    'application/x-httpd-php': 'php', 'ruby': 'rb', 'text/x-swift': 'swift',
    'text/x-kotlin': 'kt', 'xml': 'html', 'css': 'css', 'text/x-sass': 'scss',
    'yaml': 'yaml', 'markdown': 'md', 'text/x-sql': 'sql', 'shell': 'sh',
    'application/x-powershell': 'ps1', 'dockerfile': 'dockerfile', 'lua': 'lua',
    'perl': 'pl', 'r': 'r', 'dart': 'dart', 'text/x-scala': 'scala',
    'groovy': 'groovy', 'text/x-objectivec': 'm', 'text/x-vb': 'vb',
    'text/x-fsharp': 'fs', 'elixir': 'ex', 'erlang': 'erl', 'haskell': 'hs',
    'clojure': 'clj', 'julia': 'jl', 'coffeescript': 'coffee', 'text/x-less': 'less',
    'graphql': 'graphql', 'text/x-solidity': 'sol', 'vim': 'vim', 'stex': 'tex',
    'octave': 'm', 'protobuf': 'proto', 'toml': 'toml', 'properties': 'ini',
    'text/x-batch': 'bat', 'cmake': 'cmake', 'verilog': 'v', 'vhdl': 'vhd',
    'gas': 'asm', 'pascal': 'pas', 'fortran': 'f90', 'cobol': 'cob',
    'commonlisp': 'lisp', 'scheme': 'scm', 'tcl': 'tcl', 'abap': 'abap',
    'text/x-apex': 'cls', 'crystal': 'cr', 'nim': 'nim', 'text/x-ocaml': 'ml',
    'reason': 're', 'purescript': 'purs', 'elm': 'elm', 'zig': 'zig',
    'v': 'v', 'wren': 'wren', 'glsl': 'glsl', 'hlsl': 'hlsl', 'wgsl': 'wgsl',
    'svelte': 'svelte', 'vue': 'vue', 'text/typescript-jsx': 'tsx',
    'text/plain': 'txt'
  };

  const sampleCode = {
    'python': 'def greet(name):\n    message = f"Hello {name}!"\n    return message\n\nif __name__ == "__main__":\n    user = input("What is your name? ")\n    print(greet(user))',
    'javascript': 'function greet(name) {\n    return `Hello, ${name}!`;\n}\n\nconsole.log(greet("Developer"));',
    'text/typescript': 'interface User {\n    name: string;\n}\n\nfunction greet(user: User): string {\n    return `Hello, ${user.name}!`;\n}\n\nconst dev: User = { name: "Developer" };\nconsole.log(greet(dev));',
    'text/x-java': 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Developer!");\n    }\n}',
    'text/x-c++src': '#include <iostream>\n\nint main() {\n    std::cout << "Hello, Developer!" << std::endl;\n    return 0;\n}',
    'text/x-csrc': '#include <stdio.h>\n\nint main() {\n    printf("Hello, Developer!\\n");\n    return 0;\n}',
    'text/x-csharp': 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, Developer!");\n    }\n}',
    'text/x-go': 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, Developer!")\n}',
    'text/x-rustsrc': 'fn main() {\n    println!("Hello, Developer!");\n}',
    'application/x-httpd-php': '<?php\nfunction greet($name) {\n    return "Hello, $name!";\n}\n\necho greet("Developer");\n?>',
    'ruby': 'def greet(name)\n  "Hello, #{name}!"\nend\n\nputs greet("Developer")',
    'text/x-swift': 'func greet(name: String) -> String {\n    return "Hello, \\(name)!"\n}\n\nprint(greet(name: "Developer"))',
    'text/x-kotlin': 'fun main() {\n    println("Hello, Developer!")\n}',
    'xml': '<!DOCTYPE html>\n<html>\n<head>\n    <title>Hello</title>\n</head>\n<body>\n    <h1>Hello, Developer!</h1>\n</body>\n</html>',
    'css': 'body {\n    font-family: sans-serif;\n    background: #0a0a0f;\n    color: #e2e8f0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    min-height: 100vh;\n}',
    'text/x-sass': '$primary: #a855f7;\n$dark: #0a0a0f;\n\nbody\n  background: $dark\n  color: $primary',
    'yaml': 'project:\n  name: REcode\n  version: 1.0\n  languages:\n    - python\n    - javascript\n    - rust',
    'markdown': '# REcode\n\n## Welcome to REcode Editor\n\n- **Syntax Highlighting** for 60+ languages\n- **Auto-completion** powered by CodeMirror\n- **File download** support\n\n> Start coding now!',
    'text/x-sql': 'CREATE TABLE users (\n    id INT PRIMARY KEY,\n    name VARCHAR(100),\n    email VARCHAR(100)\n);\n\nINSERT INTO users VALUES (1, \'Developer\', \'dev@recode.dev\');',
    'shell': '#!/bin/bash\n# REcode Shell Script\necho "Hello, Developer!"',
    'text/plain': '// Start coding here...\n'
  };

  const editor = CodeMirror.fromTextArea(document.getElementById('codeEditor'), {
    mode: 'python',
    theme: 'recode-dark',
    lineNumbers: true,
    indentUnit: 4,
    tabSize: 4,
    lineWrapping: true,
    readOnly: false,
    autofocus: true,
    extraKeys: {
      "Tab": function(cm) {
        if (cm.somethingSelected()) {
          cm.indentSelection("add");
        } else {
          cm.replaceSelection("    ", "end");
        }
      }
    }
  });

  editor.setValue(sampleCode['python']);

  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
  }

  window.showToast = showToast;

  window.changeLang = function(mode) {
    currentMode = mode;
    editor.setOption('mode', mode);
    const ext = modeToExt[mode] || 'txt';
    currentFileName = 'main.' + ext;
    document.getElementById('fileName').textContent = currentFileName;
    const sample = sampleCode[mode];
    if (sample) {
      editor.setValue(sample);
    }
    showToast('Switched to ' + document.querySelector('#langSelect option:checked').text);
  };

  window.quickSetLang = function(mode) {
    document.getElementById('langSelect').value = mode;
    changeLang(mode);
  };

  window.closePreview = function() {
    const overlay = document.getElementById('previewOverlay');
    if (overlay) overlay.classList.remove('show');
  };

  function showPreviewOverlay(pathLabel, bodyHtml) {
    let overlay = document.getElementById('previewOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'previewOverlay';
      overlay.className = 'preview-overlay';
      overlay.innerHTML =
        '<div class="preview-window">' +
          '<div class="preview-chrome">' +
            '<div class="preview-dots"><span class="pd" style="background:#ff5f56"></span><span class="pd" style="background:#ffbd2e"></span><span class="pd" style="background:#27c93f"></span></div>' +
            '<div class="preview-address"><span>\uD83D\uDD12</span><span id="previewAddress"></span></div>' +
            '<button class="preview-close" onclick="closePreview()">&times;</button>' +
          '</div>' +
          '<iframe id="previewFrame" class="preview-frame"></iframe>' +
        '</div>';
      document.body.appendChild(overlay);
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) window.closePreview();
      });
    }
    document.getElementById('previewAddress').textContent = pathLabel;
    document.getElementById('previewFrame').srcdoc = bodyHtml;
    overlay.classList.add('show');
  }

  window.runCode = function() {
    const out = document.getElementById('outputBody');
    const code = editor.getValue().trim();
    if (!code) {
      out.innerHTML = '<div class="output-line"><span class="output-prompt">REcode</span> <span class="output-text">No code to run.</span></div>';
      return;
    }

    out.innerHTML = '<div class="output-line"><span class="output-prompt">REcode</span> <span class="output-text">Running ' + currentMode + '...</span></div>';

    setTimeout(() => {
      // HTML/XML: simulate opening the page as its own live, scrollable, interactive site — shown inline.
      if (currentMode === 'xml') {
        const looksLikeHtml = /<\s*html[\s>]|<!doctype\s+html/i.test(code) || /<\s*(div|span|body|head|p|h1|h2|h3|a|img|ul|li|table)[\s>]/i.test(code);
        if (looksLikeHtml) {
          showPreviewOverlay('recode.com/html', code);
          out.innerHTML = '<div class="output-line"><span class="output-prompt">REcode</span> <span class="output-text">Site compiled and running at recode.com/html</span></div>';
          return;
        }
        out.innerHTML = '<div class="output-line"><span class="output-prompt">REcode</span> <span class="output-text">Code compiled successfully (simulated).</span></div>';
        return;
      }

      if (currentMode === 'css') {
        const sampleBody = '<div style="font-family:sans-serif;padding:24px;"><h1>Heading 1</h1><p>Sample paragraph text to preview your CSS.</p><button>Sample Button</button><div class="box" style="width:100px;height:100px;background:#a855f7;margin-top:10px;"></div></div><style>' + code + '</style>';
        showPreviewOverlay('recode.com/css', sampleBody);
        out.innerHTML = '<div class="output-line"><span class="output-prompt">REcode</span> <span class="output-text">Site compiled and running at recode.com/css</span></div>';
        return;
      }

      if (currentMode === 'javascript') {
        try {
          const logs = [];
          const orig = console.log;
          console.log = (...a) => logs.push(a.join(' '));
          new Function(code)();
          console.log = orig;
          if (logs.length === 0) {
            out.innerHTML = '<div class="output-line"><span class="output-prompt">REcode</span> <span class="output-text">(no output)</span></div>';
          } else {
            out.innerHTML = logs.map(l => '<div class="output-line"><span class="output-text">' + l.replace(/</g, '&lt;') + '</span></div>').join('');
          }
        } catch(e) {
          out.innerHTML = '<div class="output-line"><span class="output-text" style="color:#ef4444;">Error: ' + e.message + '</span></div>';
        }
      } else if (currentMode === 'python') {
        out.innerHTML = '<div class="output-line"><span class="output-prompt">REcode</span> <span class="output-text">What is your name?</span></div><div class="output-line"><span class="output-text">Hello, Developer!</span></div>';
      } else {
        out.innerHTML = '<div class="output-line"><span class="output-prompt">REcode</span> <span class="output-text">Code compiled successfully (simulated).</span></div>';
      }
    }, 300);
  };

  window.startCoding = function() {
    editor.focus();
    editor.setCursor({line: editor.lineCount(), ch: 0});
  };

  window.seeExample = function() {
    const out = document.getElementById('outputBody');
    out.innerHTML = '<div class="output-line"><span class="output-prompt">REcode</span> <span class="output-text">Example loaded! Try editing the code above.</span></div>';
  };

  window.toggleTheme = function() {
    isDark = !isDark;
    document.body.classList.toggle('light', !isDark);
    editor.setOption('theme', isDark ? 'recode-dark' : 'recode-light');
    document.getElementById('themeIcon').textContent = isDark ? '\uD83C\uDF19' : '\u2600\uFE0F';
    showToast(isDark ? 'Dark mode enabled' : 'Light mode enabled');
  };

  window.newFile = function() {
    currentFileName = 'untitled.txt';
    document.getElementById('fileName').textContent = currentFileName;
    editor.setValue('');
    editor.setOption('mode', 'text/plain');
    document.getElementById('langSelect').value = 'text/plain';
    currentMode = 'text/plain';
    editor.focus();
    showToast('New file created!');
  };

  window.downloadCode = function() {
    const content = editor.getValue();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded: ' + currentFileName);
  };

  window.toggleOutput = function() {
    outputOpen = !outputOpen;
    document.getElementById('outputPanel').classList.toggle('collapsed', !outputOpen);
  };

  window.clearOutput = function() {
  editor.setValue('');
  document.getElementById('outputBody').innerHTML = '';
  showToast('Cleared!');
};

  const legalContent = {
    privacy: {
      title: 'Privacy Policy',
      html: `
        <div class="legal-updated">Last updated: August 27, 2026</div>
        <h4>1. Overview</h4>
        <p>This Privacy Policy explains how REcode ("we", "us", "our") handles information when you use our online code editor at this website (the "Service"). By using the Service, you agree to the practices described below.</p>
        <h4>2. Information We Collect</h4>
        <ul>
          <li><strong>Code you write or upload:</strong> Files you upload or code you type are processed locally in your browser to power editing, running, and downloading features. We do not upload your code to our servers unless a feature explicitly says otherwise.</li>
          <li><strong>Usage data:</strong> We may collect anonymous, aggregated information such as browser type, device type, and pages visited to help us improve the Service.</li>
          <li><strong>Cookies and local storage:</strong> We may use cookies or browser storage to remember preferences like your selected theme or language.</li>
          <li><strong>Advertising data:</strong> This site displays ads served by Google AdSense. Google and its partners may use cookies or device identifiers to serve relevant ads and measure performance.</li>
        </ul>
        <h4>3. How We Use Information</h4>
        <ul>
          <li>To operate, maintain, and improve the Service.</li>
          <li>To remember your preferences between visits.</li>
          <li>To display advertising and measure its effectiveness.</li>
          <li>To detect, prevent, and address technical issues or abuse.</li>
        </ul>
        <h4>4. Third-Party Services</h4>
        <p>We use third-party services, including Google AdSense and content delivery networks (such as Google Fonts and cdnjs), which may collect information in accordance with their own privacy policies. We encourage you to review Google's Privacy &amp; Terms for details on how ad-related data is handled.</p>
        <h4>5. Data Sharing</h4>
        <p>We do not sell your personal information. We may share limited, non-identifying data with service providers who help us operate the Service (such as hosting and analytics providers), or when required by law.</p>
        <h4>6. Data Retention</h4>
        <p>Code entered in the editor stays in your browser session unless you choose to download it; we do not intentionally retain it on our servers. Cookies and preference data persist until you clear your browser storage or they expire.</p>
        <h4>7. Your Choices</h4>
        <p>You can clear cookies and local storage through your browser settings at any time. You may also opt out of personalized advertising through Google's Ads Settings.</p>
        <h4>8. Children's Privacy</h4>
        <p>The Service is not directed to children under 13, and we do not knowingly collect personal information from children.</p>
        <h4>9. Changes to This Policy</h4>
        <p>We may update this Privacy Policy from time to time. Continued use of the Service after changes take effect constitutes acceptance of the revised policy.</p>
        <h4>10. Contact Us</h4>
        <p>If you have questions about this Privacy Policy, please contact us through the support channel listed on this website.</p>
      `
    },
    terms: {
      title: 'Terms & Conditions',
      html: `
        <div class="legal-updated">Last updated: August 27, 2026</div>
        <h4>1. Acceptance of Terms</h4>
        <p>By accessing or using REcode (the "Service"), you agree to be bound by these Terms &amp; Conditions. If you do not agree, please do not use the Service.</p>
        <h4>2. Description of Service</h4>
        <p>REcode provides a browser-based code editor with syntax highlighting, file upload/download, and simulated code execution across multiple programming languages. Certain "run" outputs may be simulated for demonstration purposes rather than reflecting a real compiler or interpreter.</p>
        <h4>3. Use of the Service</h4>
        <ul>
          <li>You agree to use the Service only for lawful purposes.</li>
          <li>You are solely responsible for the code, files, and content you create, upload, or download using the Service.</li>
          <li>You agree not to use the Service to create, store, or distribute malicious code, or to attempt to disrupt or gain unauthorized access to the Service or related systems.</li>
        </ul>
        <h4>4. Intellectual Property</h4>
        <p>The REcode name, logo, design, and underlying software are the property of REcode or its licensors. You retain all rights to the code and content you create using the Service.</p>
        <h4>5. Third-Party Content and Advertising</h4>
        <p>The Service may display advertisements served by third parties, including Google AdSense, and may load resources from third-party content delivery networks. We are not responsible for the content or practices of these third parties.</p>
        <h4>6. No Warranty</h4>
        <p>The Service is provided "as is" and "as available" without warranties of any kind, whether express or implied, including but not limited to accuracy, reliability, or fitness for a particular purpose. Simulated code execution results may not match real-world compiler or runtime behavior.</p>
        <h4>7. Limitation of Liability</h4>
        <p>To the fullest extent permitted by law, REcode shall not be liable for any indirect, incidental, special, or consequential damages, or for any loss of data, arising from your use of the Service.</p>
        <h4>8. Changes to the Service</h4>
        <p>We may modify, suspend, or discontinue the Service, in whole or in part, at any time without prior notice.</p>
        <h4>9. Changes to These Terms</h4>
        <p>We may revise these Terms &amp; Conditions from time to time. Continued use of the Service after changes take effect constitutes acceptance of the revised terms.</p>
        <h4>10. Governing Law</h4>
        <p>These Terms shall be governed by applicable law in the jurisdiction in which REcode operates, without regard to conflict-of-law principles.</p>
        <h4>11. Contact Us</h4>
        <p>If you have questions about these Terms &amp; Conditions, please contact us through the support channel listed on this website.</p>
      `
    }
  };

  window.openLegal = function(type) {
    const data = legalContent[type];
    if (!data) return;
    document.getElementById('legalTitle').textContent = data.title;
    document.getElementById('legalBody').innerHTML = data.html;
    document.getElementById('legalOverlay').classList.add('show');
  };

  window.closeLegal = function() {
    document.getElementById('legalOverlay').classList.remove('show');
  };

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLegal();
  });

  document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    currentFileName = file.name;
    document.getElementById('fileName').textContent = file.name;

    const ext = file.name.split('.').pop().toLowerCase();
    const mode = extToMode[ext] || 'text/plain';
    currentMode = mode;
    editor.setOption('mode', mode);
    document.getElementById('langSelect').value = mode;

    const reader = new FileReader();
    reader.onload = function(event) {
      editor.setValue(event.target.result);
      editor.refresh();
      showToast('Loaded: ' + file.name);
    };
    reader.readAsText(file);
    this.value = '';
  });
})();
