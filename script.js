$(document).ready(function () {

    // Array to store tasks
    let tasks = [];

    // Function to show toast notifications
    function showToast(message) {
        const toastEl = $('#liveToast');
        $('#toast-body').text(message);
        const toast = new bootstrap.Toast(toastEl[0]);
        toast.show();
    }

    // Function to show only one section
    function showSection(sectionId) {
        $('#add-task-section').hide();
        $('#all-tasks-section').hide();
        $('#delete-task-section').hide();
        $(sectionId).show();
    }

    // Navbar button click events
    $('#nav-add').click(() => showSection('#add-task-section'));
    $('#nav-all').click(() => showSection('#all-tasks-section'));
    $('#nav-delete').click(() => showSection('#delete-task-section'));

    // Add task form submit
    $('#task-form').submit(function (e) {
        e.preventDefault();

        // Get form values
        const name = $('#task-name').val();
        const desc = $('#task-desc').val();
        const time = $('#task-time').val();

        // Create task object
        const task = {
            id: Date.now(), // unique id
            name,
            desc,
            time,
            status: 'Pending'
        };

        // Add task to array
        tasks.push(task);

        // Clear form
        $(this)[0].reset();

        // Update tables
        updateTaskTables();

        showToast('Task added successfully 🎉');
    });

    // Function to update task tables
    function updateTaskTables(filter = 'All') {
        // Clear tables
        $('#task-list').empty();
        $('#delete-task-list').empty();

        tasks.forEach(task => {
            // Apply filter for All Tasks section
            if (filter === 'All' || task.status === filter) {
                $('#task-list').append(`
                    <tr>
                        <td>${task.name}</td>
                        <td>${task.desc}</td>
                        <td>${task.time}</td>
                        <td>${task.status}</td>
                        <td>
                            ${task.status === 'Pending' 
                                ? `<button class="btn btn-success btn-sm mark-complete" data-id="${task.id}">Mark Completed</button>` 
                                : `<button class="btn btn-secondary btn-sm" disabled>Completed</button>`}
                        </td>
                    </tr>
                `);
            }

            // Delete section table
            $('#delete-task-list').append(`
                <tr>
                    <td>${task.name}</td>
                    <td>${task.desc}</td>
                    <td>${task.time}</td>
                    <td>
                        <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
                    </td>
                </tr>
            `);
        });
    }

    // Mark task as completed
    $(document).on('click', '.mark-complete', function () {
        const id = $(this).data('id');
        tasks = tasks.map(task => task.id === id ? {...task, status: 'Completed'} : task);
        updateTaskTables($('#filter-all.active')?.data('filter') || 'All');
        showToast('Task marked as completed ✅');
    });

    // Delete task
    $(document).on('click', '.delete-task', function () {
        const id = $(this).data('id');
        tasks = tasks.filter(task => task.id !== id);
        updateTaskTables($('#filter-all.active')?.data('filter') || 'All');
        showToast('Task deleted 🗑️');
    });

    // Filter buttons
    $('#filter-all').click(function () {
        updateTaskTables('All');
    });
    $('#filter-completed').click(function () {
        updateTaskTables('Completed');
    });
    $('#filter-pending').click(function () {
        updateTaskTables('Pending');
    });

});