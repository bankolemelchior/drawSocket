### Cours complet sur l'utilisation de l'élément **Canvas** en HTML

L'élément `<canvas>` en HTML est un conteneur qui permet de dessiner des graphiques, des animations ou de manipuler des images en utilisant JavaScript. Il est principalement utilisé pour créer des visualisations, des jeux, des outils interactifs, etc.

### Plan du cours

1. **Introduction au Canvas**
   - Qu'est-ce que le Canvas ?
   - Comparaison avec SVG
   - Structure de base d'un canvas

2. **Créer un élément Canvas en HTML**
   - Syntaxe
   - Propriétés et attributs

3. **Utilisation du contexte de dessin 2D**
   - Obtenir le contexte de dessin
   - Dessiner des formes de base (rectangles, lignes, cercles)
   - Manipulation des couleurs et des styles
   - Gérer les polices et le texte

4. **Dessiner des chemins complexes**
   - Tracer des chemins avec `beginPath()` et `closePath()`
   - Courbes (quadratiques et Bézier)
   - Utilisation de `moveTo()`, `lineTo()`, `arc()` pour dessiner

5. **Images et animations**
   - Afficher des images avec `drawImage()`
   - Création d'animations avec `requestAnimationFrame()`
   - Manipulation des pixels avec `getImageData()` et `putImageData()`

6. **Gestion des événements et interactions**
   - Réagir aux événements souris et clavier
   - Dessiner en fonction des actions utilisateur

7. **Transformations**
   - Rotation, translation, et mise à l'échelle d'objets
   - Système de coordonnées et transformations complexes

8. **Dessins avancés**
   - Ombres
   - Gradients et motifs
   - Effets d'ombre et de lumière

9. **Enregistrer et exporter**
   - Sauvegarder une image du canvas
   - Exporter sous forme de fichier PNG ou JPEG

### 1. **Introduction au Canvas**

Le canvas est un élément HTML5 utilisé pour dessiner des graphiques directement dans une page web. Contrairement aux éléments comme les images ou les vidéos, l'élément `<canvas>` ne fournit aucune fonction de dessin par lui-même. Il agit comme une toile blanche sur laquelle vous dessinez à l'aide de JavaScript.

- **SVG** : Se concentre sur des graphiques vectoriels (scalables à toutes tailles) avec une syntaxe XML.
- **Canvas** : Se concentre sur des graphiques bitmap (une grille de pixels) et convient mieux aux animations en temps réel.

### 2. **Créer un élément Canvas en HTML**

Voici comment ajouter un élément `<canvas>` à votre page HTML :

```html
<canvas id="myCanvas" width="400" height="300" style="border:1px solid #000;"></canvas>
```

Le canvas est de 400 pixels de large et 300 pixels de haut. Si la taille n'est pas définie, il utilisera la taille par défaut de 300x150 pixels.

### 3. **Utilisation du contexte de dessin 2D**

Pour commencer à dessiner, vous devez obtenir le "contexte de dessin". C'est là que toutes les méthodes de dessin sont définies.

```html
<script>
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d'); // Contexte 2D
</script>
```

#### Dessiner des rectangles
```javascript
ctx.fillStyle = "green";
ctx.fillRect(10, 10, 100, 100); // Un carré vert
ctx.strokeStyle = "red";
ctx.strokeRect(150, 10, 100, 100); // Un carré contour rouge
```

#### Dessiner des lignes
```javascript
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(200, 50);
ctx.lineTo(200, 200);
ctx.stroke();

beginPath(): This tells the canvas to start a new drawing path. Think of it like lifting your pen to start drawing something new.
moveTo(50, 50): This moves the "pen" to the starting position at coordinates (50,50). The coordinates are measured in pixels where:
First number (50) is the distance from the left edge (x-coordinate)
Second number (50) is the distance from the top edge (y-coordinate)
lineTo(200, 50): Draws a straight line from the current position (50,50) to (200,50). This creates a horizontal line.
lineTo(200, 200): Draws another straight line from (200,50) to (200,200). This creates a vertical line.
stroke(): Actually renders the lines onto the canvas. Without this, the path would be defined but not visible.
The end result is an "L" shaped line drawing that:
Starts 50 pixels from the left and top
Extends 150 pixels to the right
Then extends 150 pixels down

To specify the color of the line in the canvas, you can set the strokeStyle property of the canvas context to the desired color before calling stroke().
```

### 4. **Dessiner des chemins complexes**

Pour dessiner des formes plus complexes, comme des polygones, utilisez les méthodes `beginPath()`, `lineTo()`, et `arc()`.

#### Exemple : dessiner un cercle
```javascript
ctx.beginPath();
ctx.arc(150, 150, 75, 0, 2 * Math.PI); // Un cercle
ctx.stroke();
```

#### Courbes Bézier et quadratiques
```javascript
// Courbe quadratique
ctx.beginPath();
ctx.moveTo(50, 200);
ctx.quadraticCurveTo(150, 100, 250, 200);
ctx.stroke();
```

### 5. **Images et animations**

Vous pouvez afficher des images et créer des animations dynamiques.

#### Afficher une image
```javascript
var img = new Image();
img.src = 'image.jpg';
img.onload = function() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}
```

#### Animation simple
```javascript
var x = 0;
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(x, 50, 50, 50);
    x += 1;
    requestAnimationFrame(draw);
}
draw();
```

### 6. **Gestion des événements et interactions**

Vous pouvez réagir aux interactions des utilisateurs comme les clics de souris ou les touches du clavier.

#### Exemple : dessin avec la souris
```javascript
canvas.addEventListener('mousedown', function(e) {
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    canvas.addEventListener('mousemove', draw, false);
}, false);

canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', draw, false);
}, false);

function draw(e) {
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
}
```

### 7. **Transformations**

#### Rotation, translation et mise à l’échelle
Vous pouvez transformer vos dessins avec des opérations comme `rotate()`, `scale()`, et `translate()`.

```javascript
ctx.translate(100, 100); // Déplace l'origine
ctx.rotate(Math.PI / 4); // Rotation de 45°
ctx.fillRect(0, 0, 100, 100); // Dessine un rectangle
```

### 8. **Dessins avancés**

#### Ombres
```javascript
ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.fillRect(50, 50, 100, 100); // Rectangle avec ombre
```

#### Gradients
```javascript
var gradient = ctx.createLinearGradient(0, 0, 200, 0);
gradient.addColorStop(0, "red");
gradient.addColorStop(1, "blue");
ctx.fillStyle = gradient;
ctx.fillRect(10, 10, 200, 100); // Rectangle avec dégradé
```

### 9. **Enregistrer et exporter**

Vous pouvez exporter votre canvas sous forme d'image en utilisant la méthode `toDataURL()`.

```javascript
var image = canvas.toDataURL("image/png");
var a = document.createElement('a');
a.href = image;
a.download = 'canvas-image.png';
a.click();
```

### Conclusion

L'élément Canvas est très puissant et permet de réaliser une multitude de dessins et d'animations dans vos projets web. Grâce à JavaScript, vous pouvez contrôler chaque pixel et créer des visuels dynamiques et interactifs. Il est utile pour des projets variés allant des jeux, des visualisations de données jusqu'à des applications graphiques interactives.

---