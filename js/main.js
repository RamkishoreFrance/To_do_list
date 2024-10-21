// Données initiales (Étape 1)
const tasks = [
    {
        title: "Apprendre mon cours de JavaScript",
        priority: 1
    },
    {
        title: "Créer mon compte Github",
        priority: 2
    },
    {
        title: "Répondre à mes emails",
        priority: 3
    }
];

// Sélection de la section pour afficher les tâches (Étape 1)
const taskSection = document.getElementById("task"); 

// Fonction pour afficher les tâches avec tri par priorité (Étape 1 + Bonus 6)
function displayTasks() {
    // Trier les tâches par priorité (Bonus 6)
    tasks.sort((a, b) => a.priority - b.priority);

    // Réinitialiser l'affichage
    taskSection.innerHTML = '';

    // Affichage de chaque tâche (Étape 1)
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        // Ajout de la tâche dans le label 
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(task.title));

        // Ajout du label dans le <li>
        li.appendChild(label);

        // Ajouter la couleur en fonction de la priorité (Étape 1)
        if (task.priority === 1) {
            li.classList.add('priority-high');
        } else if (task.priority === 2) {
            li.classList.add('priority-normal');
        } else {
            li.classList.add('priority-low');
        }

        // Ajout de l'élément <li> dans la section
        taskSection.appendChild(li);
    });
}

// Affichage initial des tâches au chargement de la page (Étape 1)
displayTasks();

// Sélection du formulaire et des champs (Étape 2)
const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskPriority = document.getElementById("taskPriority");

// Écouteur d'événement sur le formulaire pour ajouter une tâche (Étape 2)
taskForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Création de la nouvelle tâche à partir du formulaire (Étape 2)
    const newTask = {
        title: taskTitle.value,
        priority: parseInt(taskPriority.value)
    };

    // Ajout de la tâche au tableau tasks
    tasks.push(newTask);

    // Sauvegarder les tâches dans le localStorage (Bonus 7)
    saveTasksToLocalStorage();

    // Réafficher toutes les tâches triées par priorité (Étape 1 + Bonus 6)
    displayTasks();

    // Réinitialiser le formulaire (Étape 2)
    taskForm.reset();
});

// Sélectionner le bouton de suppression (Étape 3)
const deleteCheckedButton = document.getElementById("deleteChecked");
// Sélectionner la zone de notification (Bonus 5)
const notification = document.getElementById("notification");

// Écouteur d'événement sur le bouton de suppression (Étape 3)
deleteCheckedButton.addEventListener('click', function() {
    let tasksDeleted = 0;

    // Filtrer les tâches pour ne garder que celles non cochées (Étape 3)
    const updatedTasks = [];

    Array.from(taskSection.children).forEach((li, index) => {
        const checkbox = li.querySelector('input[type="checkbox"]');
        if (!checkbox.checked) {
            updatedTasks.push(tasks[index]);
        } else {
            tasksDeleted++;
        }
    });

    // Mettre à jour le tableau tasks
    tasks.length = 0;
    tasks.push(...updatedTasks);

    // Sauvegarder les tâches mises à jour (Bonus 7)
    saveTasksToLocalStorage();

    // Réafficher la liste mise à jour (Étape 3)
    displayTasks();

    // Notification (Bonus 5)
    if (tasksDeleted > 0) {
        notification.innerText = `${tasksDeleted} tâche(s) supprimée(s) avec succès.`;
    } else {
        notification.innerText = '';
    }

    // Cacher le message après quelques secondes (Bonus 5)
    setTimeout(() => {
        notification.innerText = '';
    }, 3000);
});

// ---------------------
// BONUS 7: PERSISTENCE DES TÂCHES AVEC LOCALSTORAGE
// ---------------------

// Fonction pour sauvegarder les tâches dans le localStorage (Bonus 7)
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fonction pour récupérer les tâches depuis le localStorage (Bonus 7)
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks.length = 0; // Vide le tableau
        tasks.push(...JSON.parse(storedTasks)); // Charger les tâches depuis le localStorage
    }
}

// Charger les tâches depuis le localStorage au démarrage (Bonus 7)
loadTasksFromLocalStorage();

// Afficher les tâches chargées après le chargement du localStorage (Bonus 7)
displayTasks();
