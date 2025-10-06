import { useState } from "react";
import { Product, products as initialProducts } from "../data/lojaData";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import HeaderAdmin from "@/components/HeaderAdmin";

export default function StorkAdmin() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleSave = (product: Product) => {
    if (editingProduct) {
      setProducts(
        products.map((p) => (p.id === editingProduct.id ? product : p))
      );
    } else {
      setProducts([...products, { ...product, id: Date.now() }]);
    }
    setEditingProduct(null);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6 mt-12 p-6">
      <HeaderAdmin />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gerenciamento de Produtos</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Adicionar Produto</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Produto</DialogTitle>
            </DialogHeader>
            <ProductForm onSave={handleSave} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={200}
                  className="rounded-lg object-cover w-full h-40"
                />
              )}
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>
                {product.roast.charAt(0).toUpperCase() + product.roast.slice(1)}{" "}
                • {product.weight}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
              <p className="font-semibold">€ {product.price.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">
                Origem: {product.origin}
              </p>
              <p className="text-sm text-muted-foreground">
                Tipo: {product.type}
              </p>

              {product.inStock ? (
                <Badge className="bg-green-500">Em stock</Badge>
              ) : (
                <Badge variant="destructive">Esgotado</Badge>
              )}

              <div className="flex gap-2 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setEditingProduct(product)}
                    >
                      Editar
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Produto</DialogTitle>
                    </DialogHeader>
                    <ProductForm initialData={product} onSave={handleSave} />
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(product.id)}
                >
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ----------------------
// FORM COMPONENT
// ----------------------

interface ProductFormProps {
  initialData?: Product;
  onSave: (product: Product) => void;
}

function ProductForm({ initialData, onSave }: ProductFormProps) {
  const [formData, setFormData] = useState<Product>(
    initialData || {
      id: 0,
      name: "",
      price: 0,
      weight: "",
      roast: "medio",
      type: "grao",
      origin: "",
      description: "",
      inStock: true,
      image: "",
    }
  );

  const handleChange = (field: keyof Product, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Nome</Label>
        <Input
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Ex: Blend Jazz Especial"
        />
      </div>

      <div className="space-y-2">
        <Label>Descrição</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Breve descrição do produto"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <Label>Preço (€)</Label>
          <Input
            type="number"
            step="0.1"
            value={formData.price}
            onChange={(e) => handleChange("price", parseFloat(e.target.value))}
          />
        </div>
        <div className="flex-1 space-y-2">
          <Label>Peso</Label>
          <Input
            value={formData.weight}
            onChange={(e) => handleChange("weight", e.target.value)}
            placeholder="Ex: 250g"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <Label>Torra</Label>
          <Select
            value={formData.roast}
            onValueChange={(val) => handleChange("roast", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="claro">Claro</SelectItem>
              <SelectItem value="medio">Médio</SelectItem>
              <SelectItem value="escuro">Escuro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 space-y-2">
          <Label>Tipo</Label>
          <Select
            value={formData.type}
            onValueChange={(val) => handleChange("type", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grao">Grão</SelectItem>
              <SelectItem value="moido">Moído</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Origem</Label>
        <Input
          value={formData.origin}
          onChange={(e) => handleChange("origin", e.target.value)}
          placeholder="Ex: Brasil / Colômbia"
        />
      </div>

      <div className="space-y-2">
        <Label>Imagem (URL)</Label>
        <Input
          value={formData.image}
          onChange={(e) => handleChange("image", e.target.value)}
          placeholder="/products/BlendJazz.png"
        />
      </div>

      <div className="flex items-center justify-between">
        <Label>Em Stock</Label>
        <Switch
          checked={formData.inStock}
          onCheckedChange={(checked) => handleChange("inStock", checked)}
        />
      </div>

      <Button type="submit" className="w-full">
        Salvar
      </Button>
    </form>
  );
}
