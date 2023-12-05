<template>
  <UContainer class="py-8">
    <UButton
      class="mb-8"
      icon="i-heroicons-plus"
      size="sm"
      color="primary"
      variant="solid"
      label="Add new"
      :trailing="false"
      @click="addNewField"
    />

    <div class="grid grid-cols-4 gap-4 my-2 pl-4 pr-16">
      <p>Name</p>
      <p>Value</p>
      <p>Multiplier</p>
      <p>Product</p>
    </div>

    <Draggable
      v-model="fields"
      v-bind="{ dragOptions, componentData }"
      item-key="id"
    >
      <template #item="{ element, index }">
        <li
          :id="element.id"
          class="flex flex-row justify-start gap-4 items-center py-2 px-4 bg-slate-800 rounded-xl mb-4"
        >
          <div class="w-full grid grid-cols-4 gap-4 my-2">
            <UInput placeholder="Name" v-model="element.name" />
            <UInput
              placeholder="Value"
              v-model="element.value"
              type="number"
              @change="calculateProduct(index)"
            />
            <UInput
              placeholder="Multiplier"
              v-model="element.multiplier"
              type="number"
              @change="calculateProduct(index)"
            />
            <UInput
              placeholder="Product"
              v-model="element.product"
              readonly
              type="number"
            />
          </div>
          <div class="inline-block">
            <UButton
              icon="i-heroicons-x-mark"
              size="sm"
              color="primary"
              square
              variant="outline"
              @click="removeField(index)"
            />
          </div>
        </li>
      </template>
    </Draggable>

    <div class="grid grid-cols-4 gap-4 my-2 pl-4 pr-16">
      <div class="col-start-4 grid grid-cols-2 gap-4">
        <UFormGroup label="Total">
          <UInput placeholder="Total" v-model="total" readonly type="number" />
        </UFormGroup>

        <UFormGroup label="Average">
          <UInput
            placeholder="Average"
            v-model="average"
            readonly
            type="number"
          />
        </UFormGroup>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
const dragOptions = computed(() => {
  return { animation: 200, group: "description" };
});
const componentData = computed(() => {
  return {
    tag: "ul",
    type: "transition-group",
  };
});

const fields = ref([]);
watch(
  fields,
  (newValue, oldValue) => {
    setTotal(calculateTotal());
    setAverage(calculateAverage());
  },
  { deep: true }
);

const average = ref(null);
const setAverage = (value) => (average.value = value);

const total = ref(null);
const setTotal = (value) => (total.value = value);

const addNewField = () => {
  const field = {
    id: Date.now().toString(),
    name: null,
    value: null,
    multiplier: null,
    product: null,
  };

  fields.value.push(field);
};

const removeField = (index) => {
  fields.value = fields.value.toSpliced(index, 1);
};

const calculateProduct = (fieldIndex) => {
  const field = fields.value[fieldIndex];
  field.product = field.multiplier
    ? field.multiplier * field.value
    : field.value;
  fields.value[fieldIndex] = { ...field };
};

const calculateTotal = () => {
  const sumOfAllProducts = fields.value.reduce(
    (accumulator, field) => accumulator + field.product,
    0
  );

  return sumOfAllProducts;
};

const calculateAverage = () => {
  const sumOfAllProducts = calculateTotal();

  const totalNumberOfProducts = fields.value.length;

  const averageBetweenAllProducts = sumOfAllProducts / totalNumberOfProducts;

  return averageBetweenAllProducts;
};
</script>
