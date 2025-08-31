import { localStore } from "../../scripts/utils/storage.js";
import View from "../../components/core/view.js";
import Toast from "../../components/ui/toast.js";
import { navigate } from "../../scripts/utils/navigation.js";
import { toProduct } from "../../scripts/utils/data.js";
import { getCurrentUser } from './../../data/authentication.js';

export default class AddProduct extends View {
  template() {
    return `
      <div class="card">
<div class="card-body">
<form class="needs-validation container py-4" novalidate style="max-width: 1200px;">
  <div class="row g-4">

    <!-- Product Name -->
    <div class="col-12 col-md-6 col-lg-4">
      <label for="name" class="form-label fw-bold">Product Name</label>
      <input type="text" name="name" class="form-control shadow-sm" required>
    </div>

    <!-- Price -->
    <div class="col-12 col-md-6 col-lg-4">
      <label for="price" class="form-label fw-bold">Price</label>
      <div class="input-group shadow-sm">
        <input type="number" step="0.1" name="price" class="form-control" required>
        <span class="input-group-text bg-success text-white fw-bold">$</span>
      </div>
    </div>

    <!-- Category -->
    <div class="col-12 col-md-6 col-lg-4">
      <label for="category" class="form-label fw-bold">Category</label>
      <select name="category" class="form-select shadow-sm" required>
        <option value="">Choose...</option>
        <option value="Women">Women</option>
        <option value="Men">Men</option>
        <option value="unisex">Unisex</option>
      </select>
    </div>

    <!-- Subcategory -->
    <div class="col-12 col-md-6 col-lg-4">
      <label for="subCategory" class="form-label fw-bold">Subcategory</label>
      <input type="text" name="subcategory" class="form-control shadow-sm" placeholder="e.g. Bags" required>
    </div>

    

    <!-- Material -->
    <div class="col-12 col-md-6 col-lg-4">
      <label for="material" class="form-label fw-bold">Material</label>
      <input type="text" name="material" class="form-control shadow-sm" placeholder="e.g. PU Leather">
    </div>

    <!-- Brand -->
    <div class="col-12 col-md-6 col-lg-4">
      <label for="brand" class="form-label fw-bold">Brand</label>
      <input type="text" name="brand" class="form-control shadow-sm" placeholder="e.g. Shein">
    </div>

    <!-- Description -->
    <div class="col-12">
      <label for="description" class="form-label fw-bold">Description</label>
      <textarea name="description" class="form-control shadow-sm" rows="3" required></textarea>
    </div>

    <!-- Stock Section -->
    <div class="col-12">
      <h4 class="mt-4 fw-bold">Stock</h4>
      <div class="mb-3">
        <button type="button" id="add-stock-btn" class="btn btn-success shadow-sm">
          <i class="fas fa-plus"></i> Add New Stock
        </button>
      </div>

      <div id="stock-section">
        <div class="card mb-4 shadow-lg border-0 rounded-3">
          <div class="card-body">
            <div class="row g-3">
              <!-- Color -->
              <div class="col-md-4">
                <label class="form-label fw-bold">Color</label>
                <input type="text" id="color" name="color" class="form-control shadow-sm" placeholder="e.g. Brown">
              </div>

              <!-- Images -->
              <div class="col-md-8">
                <label class="form-label fw-bold">Images</label>
                <input type="file" name="images[]" class="form-control shadow-sm" accept="image/*" multiple>
              </div>
            </div>

            <!-- Sizes -->
            <div class="sizes-section mt-3">
              <h6 class="fw-bold text-secondary">Sizes & Qty</h6>
              <div id="sizeAndQty" class="row g-3 size-item align-items-center">
                <div class="col-md-5">
                  <input type="text"  name="sizeName" class="form-control shadow-sm" placeholder="e.g. M">
                </div>
                <div class="col-md-5">
                  <input type="number"  name="qty" class="form-control shadow-sm" placeholder="Qty" min="0">
                </div>

            <div class="col-md-2 d-flex">
              <button type="button" class="addSizeAndQty btn btn-success btn-sm rounded-circle shadow-sm ms-2">
                  <i class="fas fa-plus"></i>
              </button>

              <button type="button" class="removeSizeAndQty btn btn-danger btn-sm rounded-circle shadow-sm ms-2">
                 <i class="fas fa-trash"></i>
              </button>
            </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="card-footer d-flex gap-3 justify-content-end">
      <button type="submit" class="btn btn-success shadow-lg mt-2">
        <i class="fas fa-save"></i> Save
      </button>

    <button type="reset" class="btn btn-danger shadow-lg mt-2">
      <a href="Product.html"></a>
     <i class="fas fa-times"></i> Cancel
    </button>
  </div>

<div class="toast-container position-fixed top-0 end-0 p-3">
  <div id="liveToast" class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">
        ✔ Product saved successfully and wait for admin to approve it !
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
</div>

</div>

</form>
 </div>
  </div>
        `
  }

  script() {
    const form = document.querySelector(".needs-validation");
    const stockSection = document.getElementById("stock-section");
    const addStockBtn = document.getElementById("add-stock-btn");

    // ===== Templates =====
    function createStockCard() {
      const card = document.createElement("div");
      card.className = "card mb-4 shadow-lg border-0 rounded-3";
      card.innerHTML = `
      <div class="card-body">
        <div class="row g-3">
          <!-- Color -->
          <div class="col-md-4">
            <label class="form-label fw-bold">Color</label>
            <input type="text" name="color" class="form-control shadow-sm" placeholder="e.g. Brown">
          </div>
          <!-- Images -->
          <div class="col-md-8">
            <label class="form-label fw-bold">Images</label>
            <input type="file" name="images[]" class="form-control shadow-sm" accept="image/*" multiple>
          </div>
        </div>

        <!-- Sizes -->
        <div class="sizes-section mt-3">
          <h6 class="fw-bold text-secondary">Sizes & Qty</h6>
          <div class="row g-3 size-item align-items-center">
            <div class="col-md-5">
              <input type="text" name="sizeName" class="form-control shadow-sm" placeholder="e.g. M">
            </div>
            <div class="col-md-5">
              <input type="number" name="qty" class="form-control shadow-sm" placeholder="Qty" min="0">
            </div>
            <div class="col-md-2 d-flex">
              <button type="button" class="addSizeAndQty btn btn-success btn-sm rounded-circle shadow-sm ms-2">
                <i class="fas fa-plus"></i>
              </button>
              <button type="button" class="removeSizeAndQty btn btn-danger btn-sm rounded-circle shadow-sm ms-2">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
      return card;
    }

    function createSizeRow() {
      const row = document.createElement("div");
      row.className = "row g-3 size-item align-items-center mt-2";
      row.innerHTML = `
      <div class="col-md-5">
        <input type="text" name="sizeName" class="form-control shadow-sm" placeholder="e.g. M">
      </div>
      <div class="col-md-5">
        <input type="number" name="qty" class="form-control shadow-sm" placeholder="Qty" min="0">
      </div>
      <div class="col-md-2 d-flex">
        <button type="button" class="addSizeAndQty btn btn-success btn-sm rounded-circle shadow-sm ms-2">
          <i class="fas fa-plus"></i>
        </button>
        <button type="button" class="removeSizeAndQty btn btn-danger btn-sm rounded-circle shadow-sm ms-2">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
      return row;
    }

    // ===== Helpers =====
    function setInvalid(input, message) {
      input.classList.add("is-invalid");
      let feedback = input.parentElement.querySelector(".invalid-feedback");
      if (!feedback) {
        feedback = document.createElement("div");
        feedback.className = "invalid-feedback";
        input.parentElement.appendChild(feedback);
      }
      feedback.textContent = message;
    }

    function clearInvalid(input) {
      input.classList.remove("is-invalid");
      const feedback = input.parentElement.querySelector(".invalid-feedback");
      if (feedback) feedback.textContent = "";
    }

    // Clear validation errors on input
    form.addEventListener("input", function (e) {
      if (e.target.classList.contains("is-invalid")) {
        clearInvalid(e.target);
      }
    }, true);

    // Validate a single stock card
    function validateSingleStockCard(card, showErrors = true) {
      let valid = true;

      const color = card.querySelector("input[name='color']");
      const images = card.querySelector("input[name='images[]']");
      if (color.value.trim() === "") {
        if (showErrors) setInvalid(color, "Please enter a color.");
        valid = false;
      } else if (showErrors) clearInvalid(color);

      if (!images.files || images.files.length === 0) {
        if (showErrors) setInvalid(images, "Please upload at least one image.");
        valid = false;
      } else if (showErrors) clearInvalid(images);

      // Sizes rows
      const sizeRows = card.querySelectorAll(".size-item");
      let hasAtLeastOneCompleteSize = false;

      sizeRows.forEach(row => {
        const sizeName = row.querySelector("input[name='sizeName']");
        const qty = row.querySelector("input[name='qty']");
        const sizeNameVal = sizeName.value.trim();
        const qtyVal = qty.value.trim();

        if (sizeNameVal === "" || qtyVal === "" || isNaN(parseInt(qtyVal)) || parseInt(qtyVal) < 0) {
          if (showErrors) {
            if (sizeNameVal === "") setInvalid(sizeName, "Please enter a size name.");
            else clearInvalid(sizeName);

            if (qtyVal === "" || isNaN(parseInt(qtyVal)) || parseInt(qtyVal) < 0) {
              setInvalid(qty, "Please enter a valid quantity (0 or more).");
            } else {
              clearInvalid(qty);
            }
          }
        } else {
          hasAtLeastOneCompleteSize = true;
          if (showErrors) { clearInvalid(sizeName); clearInvalid(qty); }
        }
      });

      if (!hasAtLeastOneCompleteSize) valid = false;

      return valid;
    }

    // ===== Add Stock =====
    addStockBtn.addEventListener("click", function () {
      const lastCard = stockSection.querySelector(".card:last-of-type");
      if (!lastCard) {
        stockSection.appendChild(createStockCard());
        return;
      }
      const ok = validateSingleStockCard(lastCard, true);
      if (!ok) return;
      stockSection.appendChild(createStockCard());
    });

    // ===== Sizes add/remove =====
    stockSection.addEventListener("click", function (e) {
      if (e.target.closest(".addSizeAndQty")) {
        const sizeSection = e.target.closest(".sizes-section");
        const lastRow = sizeSection.querySelector(".size-item:last-of-type");
        const size = lastRow.querySelector("input[name='sizeName']");
        const qty = lastRow.querySelector("input[name='qty']");

        let allow = true;
        if (size.value.trim() === "") {
          setInvalid(size, "Please enter a size name.");
          allow = false;
        } else {
          clearInvalid(size);
        }
        if (qty.value.trim() === "" || isNaN(parseInt(qty.value)) || parseInt(qty.value) < 0) {
          setInvalid(qty, "Please enter a valid quantity (0 or more).");
          allow = false;
        } else {
          clearInvalid(qty);
        }

        if (allow) sizeSection.appendChild(createSizeRow());
      }

      if (e.target.closest(".removeSizeAndQty")) {
        const currentRow = e.target.closest(".size-item");
        const parent = currentRow.parentElement;
        if (parent.querySelectorAll(".size-item").length > 1) {
          currentRow.remove();
        }
      }
    });

    // ===== Generate Product ID =====
    function generateProductID(category, subCategory) {
      // Ensure inputs are valid
      if (!category || typeof category !== 'string' || !subCategory || typeof subCategory !== 'string') {
        return 'INVALID_ID_' + Date.now().toString().slice(8); // Fallback ID
      }

      // First letter of category
      const categoryPrefix = category.charAt(0).toUpperCase();
      // First two letters of subcategory, padded if needed
      const subCategoryPrefix = subCategory.length >= 2 ? subCategory.slice(0, 2).toLowerCase() : subCategory.toLowerCase().padEnd(2, 'x');

      // Get existing products
      const products = localStore.read("products") || [];

      // Filter products with valid Category and Subcategory
      const relatedProducts = products.filter(product =>
        product &&
        product.Category && typeof product.Category === 'string' &&
        product.Subcategory && typeof product.Subcategory === 'string' &&
        product.Category.charAt(0).toUpperCase() === categoryPrefix &&
        product.Subcategory.slice(0, 2).toLowerCase() === subCategoryPrefix
      );

      // Find the highest serial number
      const maxSerial = relatedProducts.reduce((max, product) => {
        const serial = parseInt(product.Id.slice(-3)) || 0;
        return Math.max(max, serial);
      }, 0);

      // Generate new serial number (padded to 3 digits)
      const newSerial = (maxSerial + 1).toString().padStart(3, "0");

      // Return ID (e.g., WBa001)
      return `${categoryPrefix}${subCategoryPrefix}${newSerial}`;
    }

    // ===== Form submit =====
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      event.stopPropagation();
      let user = getCurrentUser();
      let isValid = true;

      // Validation regex
      const nameRegex = /^[^0-9]+$/;

      // Validate Product Name
      const name = form.querySelector("input[name='name']");
      if (name.value.trim() === "") {
        setInvalid(name, "Product name is required.");
        isValid = false;
      } else if (!nameRegex.test(name.value)) {
        setInvalid(name, "Product name must contain only letters (no numbers).");
        isValid = false;
      } else if (name.value.trim().length > 100) {
        setInvalid(name, "Product Name must not exceed 100 characters.");
        isValid = false;
      } else {
        clearInvalid(name);
      }

      // Validate Brand
      const brand = form.querySelector("input[name='brand']");
      if (brand.value.trim() === "") {
        setInvalid(brand, "Brand is required.");
        isValid = false;
      } else if (!nameRegex.test(brand.value)) {
        setInvalid(brand, "Brand must contain only letters (no numbers).");
        isValid = false;
      } else if (brand.value.trim().length > 100) {
        setInvalid(brand, "Brand must not exceed 100 characters.");
        isValid = false;
      } else {
        clearInvalid(brand);
      }

      // Validate Material
      const material = form.querySelector("input[name='material']");
      if (material.value.trim() === "") {
        setInvalid(material, "Material is required.");
        isValid = false;
      } else if (!nameRegex.test(material.value)) {
        setInvalid(material, "Material must contain only letters (no numbers).");
        isValid = false;
      } else if (material.value.trim().length > 100) {
        setInvalid(material, "Material must not exceed 100 characters.");
        isValid = false;
      } else {
        clearInvalid(material);
      }

      // Validate Price
      const price = form.querySelector("input[name='price']");
      if (price.value.trim() === "" || parseFloat(price.value) <= 0) {
        setInvalid(price, "Please enter a valid price.");
        isValid = false;
      } else {
        clearInvalid(price);
      }

      // Validate Category
      const category = form.querySelector("select[name='category']");
      if (category.value.trim() === "") {
        setInvalid(category, "Please select a category.");
        isValid = false;
      } else {
        clearInvalid(category);
      }

      // Validate Subcategory
      const subCategory = form.querySelector("input[name='subcategory']");
      if (subCategory.value.trim() === "") {
        setInvalid(subCategory, "Please enter a subcategory.");
        isValid = false;
      } else {
        clearInvalid(subCategory);
      }

      // Validate Description
      const description = form.querySelector("textarea[name='description']");
      if (description.value.trim() === "") {
        setInvalid(description, "Description is required.");
        isValid = false;
      } else if (!nameRegex.test(description.value)) {
        setInvalid(description, "Description must contain only letters (no numbers).");
        isValid = false;
      } else if (description.value.trim().length < 200) {
        setInvalid(description, "Description must be at least 200 characters.");
        isValid = false;
      } else {
        clearInvalid(description);
      }

      // Validate Stock Cards
      const stockCards = stockSection.querySelectorAll(".card");
      if (stockCards.length === 0) {
        stockSection.appendChild(createStockCard());
        isValid = false;
      } else {
        stockCards.forEach(card => {
          if (!validateSingleStockCard(card, true)) isValid = false;
        });
      }

      if (isValid) {
        // Collect form data manually
        const productData = {
          id: generateProductID(
            form.querySelector("select[name='category']").value,
            form.querySelector("input[name='subcategory']").value
          ),
          name: form.querySelector("input[name='name']").value,
          brand: form.querySelector("input[name='brand']").value,
          description: form.querySelector("textarea[name='description']").value,
          category: form.querySelector("select[name='category']").value,
          subCategory: form.querySelector("input[name='subcategory']").value,
          price: parseFloat(form.querySelector("input[name='price']").value),
          material: form.querySelector("input[name='material']").value,
          sellerId: user.id,
          status: "pending",
          stock: [],
          images: []
        };

        // Collect stock and images data
        stockCards.forEach(card => {
          const color = card.querySelector("input[name='color']").value;
          const images = card.querySelector("input[name='images[]']").files;
          const sizes = [];

          card.querySelectorAll(".size-item").forEach(row => {
            const sizeInput = row.querySelector("input[name='sizeName']");
            const qtyInput = row.querySelector("input[name='qty']");
            const size = sizeInput ? sizeInput.value : "";
            const qty = qtyInput ? qtyInput.value : "";

            if (size && qty) {
              sizes.push({ name, qty: parseInt(qty) });
            }
          });

          productData.stock.push({
            color,
            sizes
          });

          Array.from(images).forEach(img => {
            productData.images.push(img.name);
          });
        });

        // Convert to Product object
        const product = toProduct(productData);

        // Save product
        let products = localStore.read("products") || [];
        products.push(product);
        localStore.write("products", products);


        console.log(products);

        // Show success toast
        Toast.notify("New Product has been added!")

        //Redirect after 2 seconds
        setTimeout(() => {
          navigate("/seller/products")
        }, 5000);
      }
    });

    // ===== Initial stock card =====
    stockSection.innerHTML = "";
    stockSection.appendChild(createStockCard());


  }

}