window.onload = function() {
    setTimeout(function() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    }, 1000); // Reduced the loading time to 1 second

    // Make the terminal window draggable
    dragElement(document.getElementById("terminalWindow"));

    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        var header = document.getElementById(elmnt.id + "Header");
        if (header) {
            // if present, the header is where you move the DIV from:
            header.onmousedown = dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    document.getElementById('closeButton').onclick = function() {
        window.close();
    };

    document.getElementById('minimizeButton').onclick = function() {
        const message = document.getElementById('minimizeMessage');
        message.classList.remove('hidden');
        setTimeout(function() {
            message.classList.add('hidden');
        }, 3000);
    };

    document.getElementById('maximizeButton').onclick = function() {
        const terminal = document.getElementById('terminalWindow');
        if (!document.fullscreenElement) {
            terminal.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    const commandInput = document.getElementById('commandInput');
    commandInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            handleCommand(e.target.value);
            e.target.value = '';
        }
    });

    function handleCommand(command) {
        const terminalOutput = document.getElementById('terminalOutput');
        const newCommand = document.createElement('p');
        newCommand.innerHTML = `<span class="prompt">root@joxy:~$</span> ${command}`;
        terminalOutput.appendChild(newCommand);

        let response;
        switch (command.split(' ')[0]) {
            case 'ls':
                response = 'file1.txt  file2.txt  directory1';
                break;
            case 'help':
                response = 'Available commands: ls, help, echo [message]';
                break;
            case 'echo':
                response = command.substring(5);
                break;
            default:
                response = `${command}: command not found`;
        }

        const commandResponse = document.createElement('p');
        commandResponse.textContent = response;
        terminalOutput.appendChild(commandResponse);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
};
