// Données initiales des tâches
let tasks = [
    {
        title: "Apprendre mon cours de JavaScript",
        priority: 1,
        image: null
    },
    {
        title: "Créer mon compte Github",
        priority: 2,
        image: null
    },
    {
        title: "Répondre à mes emails",
        priority: 3,
        image: null
    }
];

// Sélection des éléments du DOM
const taskSection = document.getElementById("task");
const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskPriority = document.getElementById("taskPriority");
const taskImage = document.getElementById("taskImage");
const addTaskButton = document.getElementById("addTaskButton");
const deleteCheckedButton = document.getElementById("deleteChecked");
const searchBar = document.getElementById('searchBar');
const notification = document.getElementById("notification");

// Fonction pour afficher les tâches
function displayTasks() {
    taskSection.innerHTML = '';  // Réinitialiser la section des tâches

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.dataset.index = index;  // Ajouter un attribut de données pour l'index

        // Ajouter l'image si elle existe
        if (task.image) {
            const img = document.createElement('img');
            img.src = task.image;
            img.alt = 'Image de la tâche';
            img.style.width = '50px';
            img.style.height = '50px';
            img.style.marginRight = '12px';
            li.appendChild(img);

            // Ajouter l'événement de zoom sur l'image
            img.addEventListener('click', () => zoomImage(img));
        }

        // Ajouter le texte de la tâche dans le label
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(task.title));

        // Ajouter le label dans le <li>
        li.appendChild(label);

        // Ajouter la couleur en fonction de la priorité
        if (task.priority === 1) {
            li.classList.add('priority-high');
        } else if (task.priority === 2) {
            li.classList.add('priority-normal');
        } else {
            li.classList.add('priority-low');
        }

        // Ajouter l'élément <li> dans la section
        taskSection.appendChild(li);
    });
}

// Fonction pour zoomer sur l'image
function zoomImage(imgElement) {
    // Créer un conteneur pour l'image zoomée
    const zoomedImageContainer = document.createElement('div');
    zoomedImageContainer.id = 'zoomedImageContainer';
    
    // Créer l'élément image dans le conteneur
    const zoomedImg = document.createElement('img');
    zoomedImg.src = imgElement.src;
    zoomedImg.alt = 'Image zoomée';
    zoomedImageContainer.appendChild(zoomedImg);
    
    // Ajouter le conteneur à la page
    document.body.appendChild(zoomedImageContainer);

    // Afficher le conteneur zoomé
    zoomedImageContainer.style.display = 'flex';

    // Fermer le zoom si on clique sur le conteneur
    zoomedImageContainer.addEventListener('click', () => {
        zoomedImageContainer.style.display = 'none';
        document.body.removeChild(zoomedImageContainer); // Retirer le conteneur de l'écran
    });
}

// Fonction pour ajouter une tâche
addTaskButton.addEventListener('click', function() {
    const newTask = {
        title: taskTitle.value,
        priority: parseInt(taskPriority.value),
        image: taskImage.files[0] ? URL.createObjectURL(taskImage.files[0]) : null
    };

    // Ajouter la tâche au tableau tasks
    tasks.push(newTask);

    // Sauvegarder dans localStorage
    saveTasksToLocalStorage();

    // Réafficher les tâches
    displayTasks();

    // Réinitialiser le formulaire
    taskForm.reset();
});

// Fonction pour sauvegarder les tâches dans le localStorage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fonction pour récupérer les tâches depuis le localStorage
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks); // Charger les tâches depuis le localStorage
    }
}

// Charger les tâches depuis le localStorage au démarrage
loadTasksFromLocalStorage();
displayTasks();

// Fonction de suppression des tâches cochées
deleteCheckedButton.addEventListener('click', function() {
    // Filtrer les tâches non cochées
    tasks = tasks.filter((task, index) => {
        const checkbox = document.querySelector(`input[type="checkbox"][data-index="${index}"]`);
        return !checkbox.checked;
    });

    // Sauvegarder les tâches mises à jour dans le localStorage
    saveTasksToLocalStorage();

    // Réafficher les tâches restantes
    displayTasks();

    // Afficher une notification si des tâches ont été supprimées
    notification.innerText = 'Tâches supprimées avec succès.';
    setTimeout(() => notification.innerText = '', 3000);  // Cacher la notification après 3 secondes
});

// Fonction pour rechercher les tâches
function searchTasks() {
    const searchQuery = searchBar.value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchQuery));

    // Réinitialiser l'affichage et afficher les tâches filtrées
    taskSection.innerHTML = '';
    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.dataset.index = index;

        if (task.image) {
            const img = document.createElement('img');
            img.src = task.image;
            img.alt = 'Image de la tâche';
            img.style.width = '50px';
            img.style.height = '50px';
            img.style.marginRight = '12px';
            li.appendChild(img);

            // Ajouter l'événement de zoom sur l'image
            img.addEventListener('click', () => zoomImage(img));
        }

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(task.title));
        li.appendChild(label);

        if (task.priority === 1) {
            li.classList.add('priority-high');
        } else if (task.priority === 2) {
            li.classList.add('priority-normal');
        } else {
            li.classList.add('priority-low');
        }

        taskSection.appendChild(li);
    });
}
// Fonction pour supprimer les tâches cochées
deleteCheckedButton.addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('#task input[type="checkbox"]');
    const tasksDeleted = [];

    // Parcourir les cases à cocher pour supprimer les tâches sélectionnées
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            tasksDeleted.push(tasks[index].title); // Ajouter le nom de la tâche supprimée
        }
    });

    // Filtrer les tâches non cochées et les conserver
    tasks = tasks.filter((task, index) => !checkboxes[index].checked);

    // Sauvegarder les tâches mises à jour dans le localStorage
    saveTasksToLocalStorage();

    // Réafficher les tâches restantes
    displayTasks();

    // Afficher la notification pour les tâches supprimées
    if (tasksDeleted.length > 0) {
        showNotification(`Tâche(s) supprimée(s) : ${tasksDeleted.join(', ')}`, 'deleted');
    } else {
        showNotification('Aucune tâche sélectionnée pour suppression.', 'deleted');
    }
});

// Fonction pour ajouter une tâche
addTaskButton.addEventListener('click', function() {
    const newTask = {
        title: taskTitle.value,
        priority: parseInt(taskPriority.value),
        image: taskImage.files[0] ? URL.createObjectURL(taskImage.files[0]) : null
    };

    // Ajouter la tâche au tableau tasks
    tasks.push(newTask);

    // Sauvegarder dans le localStorage
    saveTasksToLocalStorage();

    // Réafficher les tâches
    displayTasks();

    // Réinitialiser le formulaire
    taskForm.reset();

    // Afficher la notification pour la tâche ajoutée
    showNotification(`Tâche ajoutée : ${newTask.title}`, 'added');
});

// Afficher la notification
function showNotification(message, type) {
    notification.innerText = message;
    notification.className = ''; // Réinitialiser les classes

    if (type === 'added') {
        notification.classList.add('added');
    } else if (type === 'deleted') {
        notification.classList.add('deleted');
    }

    notification.classList.add('show');

    // Masquer la notification après 3 secondes
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Sauvegarder et charger les tâches
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

loadTasksFromLocalStorage();
displayTasks();
