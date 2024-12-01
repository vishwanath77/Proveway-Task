document.addEventListener("DOMContentLoaded", function () {
    // Select all boxes and ensure everything is reset on page load
    const boxes = document.querySelectorAll(".box");
    resetAllBoxes(boxes);

    // Add event listeners for each box
    boxes.forEach(box => {
        addClickListener(box);
        addHoverListeners(box);
        addDropdownClickListener(box);
    });
});

/**
 * Reset all boxes to ensure no box is selected and content sections are hidden.
 * @param {NodeList} boxes - List of all boxes
 */
function resetAllBoxes(boxes) {
    boxes.forEach(box => {
        box.classList.remove('selected');
        const radioButton = box.querySelector('.radio-button');
        if (radioButton) {
            radioButton.checked = false;
        }
        const contentSection = box.querySelector('.content-section');
        if (contentSection) {
            contentSection.style.display = 'none';
        }
    });
}

/**
 * Adds a click event listener to the box to handle selection and display logic.
 * @param {HTMLElement} box - The box element
 */
function addClickListener(box) {
    box.addEventListener("click", function () {
        const radioButton = this.querySelector('.radio-button');

        // Uncheck other boxes' radio buttons
        uncheckOtherRadioButtons(radioButton);

        // Reset previously selected box
        resetSelectedBox(this);

        // Mark the clicked box as selected and toggle its content section
        this.classList.add('selected');
        radioButton.checked = !radioButton.checked;

        toggleContentSection(this, radioButton.checked);
    });
}

/**
 * Adds hover event listeners to the box to handle hover effects.
 * @param {HTMLElement} box - The box element
 */
function addHoverListeners(box) {
    box.addEventListener("mouseenter", function () {
        if (!this.classList.contains('selected')) {
            this.classList.add('hover');
        }
    });

    box.addEventListener("mouseleave", function () {
        this.classList.remove('hover');
    });
}

/**
 * Adds a click event listener to the dropdown button to prevent event propagation.
 * @param {HTMLElement} box - The box element
 */
function addDropdownClickListener(box) {
    const dropdownButton = box.querySelector('.dropdown select');
    if (dropdownButton) {
        dropdownButton.addEventListener("click", function (event) {
            box.click(); // Select the box
            event.stopPropagation(); // Prevent dropdown click from triggering box click
        });
    }
}

/**
 * Unchecks all radio buttons except the one in the selected box.
 * @param {HTMLInputElement} selectedRadioButton - The radio button in the clicked box
 */
function uncheckOtherRadioButtons(selectedRadioButton) {
    const allRadioButtons = document.querySelectorAll('input[name="pairSelection"]');
    allRadioButtons.forEach(radio => {
        if (radio !== selectedRadioButton) {
            radio.checked = false;
        }
    });
}

/**
 * Resets the currently selected box by removing the 'selected' class
 * and hiding its content section.
 * @param {HTMLElement} clickedBox - The newly clicked box
 */
function resetSelectedBox(clickedBox) {
    const selectedBox = document.querySelector('.selected');
    if (selectedBox && selectedBox !== clickedBox) {
        selectedBox.classList.remove('selected');
        const contentSection = selectedBox.querySelector('.content-section');
        if (contentSection) {
            contentSection.style.display = 'none';
        }
    }
}

/**
 * Toggles the visibility of the content section in the clicked box.
 * @param {HTMLElement} box - The box element
 * @param {boolean} isVisible - Whether the content section should be visible
 */
function toggleContentSection(box, isVisible) {
    const contentSection = box.querySelector('.content-section');
    if (contentSection) {
        contentSection.style.display = isVisible ? 'block' : 'none';
    }
}
